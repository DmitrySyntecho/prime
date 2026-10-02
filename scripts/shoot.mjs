/**
 * Screenshot helper for verifying pages during development.
 *
 * Drives an isolated headless Chrome over the DevTools protocol (Node's built-in
 * WebSocket, no extra dependency). `chrome --screenshot` cannot capture a
 * scrolled position, and full-page capture of a very tall document hangs, so
 * this takes a sequence of viewport shots at explicit scroll positions instead.
 *
 * Usage:
 *   node scripts/shoot.mjs <url> <out-dir> [flags]
 *
 *   --targets=a,b+800   element ids to scroll to (optional +px further), one PNG each
 *   --scrolls=0,2000    absolute scroll offsets in px, one PNG each
 *   --click=<selector>  click an element before capturing (drawers, toggles)
 *   --width=1600 --height=1000
 *   --dark              force the .dark theme
 *   --wait=2500         ms to settle after navigation
 *   --offset=56         px subtracted when scrolling to an id (sticky bar height)
 *
 * Always reports document height, horizontal overflow and console errors.
 */

import { spawn } from 'node:child_process'
import fs from 'node:fs'
import path from 'node:path'
import net from 'node:net'
import os from 'node:os'

// Declared as a function so it is hoisted above the top-level await below.
function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms))
}

const CHROME = process.env.CHROME_PATH || 'C:/Program Files/Google/Chrome/Application/chrome.exe'

const [url, outDir, ...rest] = process.argv.slice(2)
if (!url || !outDir) {
  console.error('usage: node scripts/shoot.mjs <url> <out-dir> [flags]')
  process.exit(1)
}

const flag = (name, fallback) => {
  const hit = rest.find((a) => a.startsWith(`--${name}=`))
  return hit ? hit.split('=').slice(1).join('=') : fallback
}
const has = (name) => rest.includes(`--${name}`)

const width = Number(flag('width', 1600))
const height = Number(flag('height', 1000))
const dark = has('dark')
const wait = Number(flag('wait', 2500))
const offset = Number(flag('offset', 56))
const targets = (flag('targets', '') || '').split(',').filter(Boolean)
const click = flag('click', null)
const scrolls = (flag('scrolls', '') || '').split(',').filter(Boolean).map(Number)

const port = await freePort()
const profile = fs.mkdtempSync(path.join(os.tmpdir(), 'shoot-'))

const chrome = spawn(
  CHROME,
  [
    '--headless=new',
    '--disable-gpu',
    '--hide-scrollbars',
    '--no-first-run',
    '--no-default-browser-check',
    '--disable-extensions',
    `--remote-debugging-port=${port}`,
    // Node's built-in WebSocket sends an Origin header, which CDP rejects by
    // default. Without this the attach silently times out.
    '--remote-allow-origins=*',
    `--user-data-dir=${profile}`,
    `--window-size=${width},${height}`,
    'about:blank',
  ],
  { stdio: ['ignore', 'ignore', 'pipe'] }
)

let chromeStderr = ''
chrome.stderr?.on('data', (d) => { chromeStderr += d.toString() })
chrome.on('error', (e) => { console.error('failed to launch Chrome:', e.message) })

let exitCode = 0
try {
  const ws = await connect(port)
  await run(ws)
  ws.close()
} catch (e) {
  console.error('shoot failed:', e.message)
  exitCode = 1
} finally {
  chrome.kill()
}
// The WebSocket and the child process keep the loop alive; leave explicitly.
process.exit(exitCode)

async function run(ws) {
  let id = 0
  const pending = new Map()
  const consoleErrors = []

  ws.addEventListener('message', (ev) => {
    const msg = JSON.parse(ev.data)
    if (msg.method === 'Runtime.exceptionThrown') {
      consoleErrors.push(msg.params?.exceptionDetails?.exception?.description?.split('\n')[0] || 'exception')
      return
    }
    if (msg.method === 'Runtime.consoleAPICalled' && msg.params?.type === 'error') {
      consoleErrors.push(msg.params.args?.map((a) => a.value ?? a.description).join(' ').split('\n')[0])
      return
    }
    if (msg.id && pending.has(msg.id)) {
      const { resolve, reject } = pending.get(msg.id)
      pending.delete(msg.id)
      msg.error ? reject(new Error(msg.error.message)) : resolve(msg.result)
    }
  })

  /** One CDP call, with a hard timeout so a stuck command cannot hang the run. */
  const send = (method, params = {}, timeout = 30000) =>
    new Promise((resolve, reject) => {
      const msgId = ++id
      const timer = setTimeout(() => {
        pending.delete(msgId)
        reject(new Error(`${method} timed out after ${timeout}ms`))
      }, timeout)
      pending.set(msgId, {
        resolve: (r) => { clearTimeout(timer); resolve(r) },
        reject: (e) => { clearTimeout(timer); reject(e) },
      })
      ws.send(JSON.stringify({ id: msgId, method, params }))
    })

  const evaluate = async (expression) => {
    const r = await send('Runtime.evaluate', { expression, returnByValue: true })
    return r?.result?.value
  }

  await send('Page.enable')
  await send('Runtime.enable')
  await send('Emulation.setDeviceMetricsOverride', {
    width,
    height,
    deviceScaleFactor: 1,
    mobile: width < 640,
  })

  await send('Page.navigate', { url })
  await sleep(wait)

  if (dark) {
    // next-themes owns the class; set it directly rather than driving the toggle.
    await evaluate(
      `localStorage.setItem('theme','dark');document.documentElement.classList.add('dark');true`
    )
    await sleep(500)
  }

  // Nudge lazy images and scroll-triggered reveals into their settled state.
  await evaluate(`window.scrollTo(0, document.body.scrollHeight); true`)
  await sleep(1200)
  await evaluate(`window.scrollTo(0, 0); true`)
  await sleep(600)

  if (click) {
    const hit = await evaluate(
      `(() => { const el = document.querySelector(${JSON.stringify(click)});
         if (!el) return false; el.click(); return true; })()`
    )
    if (!hit) console.error(`  ! nothing matched ${click}`)
    await sleep(700)
  }

  fs.mkdirSync(outDir, { recursive: true })

  const capture = async (name) => {
    const shot = await send('Page.captureScreenshot', { format: 'png' }, 45000)
    fs.writeFileSync(path.join(outDir, name), Buffer.from(shot.data, 'base64'))
  }

  let count = 0
  if (targets.length) {
    for (const spec of targets) {
      // "id+1600" scrolls to the element, then 1600px further into it.
      const [t, extra = '0'] = spec.split('+')
      const y = await evaluate(
        `(() => { const el = document.getElementById(${JSON.stringify(t)});
           if (!el) return -1;
           const top = el.getBoundingClientRect().top + window.scrollY - ${offset} + ${Number(extra) || 0};
           window.scrollTo(0, top); return Math.round(top); })()`
      )
      if (y === -1) {
        console.error(`  ! no element #${t}`)
        continue
      }
      await sleep(1200)
      await capture(`${spec.replace('+', '_')}.png`)
      count++
    }
  } else if (scrolls.length) {
    for (const y of scrolls) {
      await evaluate(`window.scrollTo(0, ${y}); true`)
      await sleep(650)
      await capture(`y-${y}.png`)
      count++
    }
  } else {
    await capture('page.png')
    count++
  }

  const metrics = JSON.parse(
    await evaluate(
      `JSON.stringify({ h: document.documentElement.scrollHeight,
                        sw: document.documentElement.scrollWidth,
                        cw: document.documentElement.clientWidth,
                        bsw: document.body.scrollWidth })`
    )
  )

  console.log(`${count} shot(s) → ${outDir}`)
  console.log(`document: ${metrics.cw} × ${metrics.h}`)
  const overflow = Math.max(metrics.sw, metrics.bsw) - metrics.cw
  console.log(
    overflow > 1
      ? `HORIZONTAL OVERFLOW: +${overflow}px (scrollWidth ${metrics.sw}, body ${metrics.bsw})`
      : 'no horizontal overflow'
  )
  console.log(
    consoleErrors.length
      ? `${consoleErrors.length} console error(s):\n  ${consoleErrors.slice(0, 8).join('\n  ')}`
      : 'no console errors'
  )
}

async function connect(port) {
  let lastError = ''
  for (let i = 0; i < 60; i++) {
    try {
      const res = await fetch(`http://127.0.0.1:${port}/json/list`)
      const page = (await res.json()).find((t) => t.type === 'page')
      if (page?.webSocketDebuggerUrl) {
        const ws = new WebSocket(page.webSocketDebuggerUrl)
        await new Promise((resolve, reject) => {
          ws.addEventListener('open', resolve, { once: true })
          ws.addEventListener('error', () => reject(new Error('websocket rejected')), { once: true })
        })
        return ws
      }
    } catch (e) {
      lastError = e.message
    }
    await sleep(250)
  }
  throw new Error(`could not attach on ${port}: ${lastError}\n${chromeStderr.slice(-600)}`)
}

function freePort() {
  return new Promise((resolve, reject) => {
    const srv = net.createServer()
    srv.listen(0, '127.0.0.1', () => {
      const { port } = srv.address()
      srv.close(() => resolve(port))
    })
    srv.on('error', reject)
  })
}
