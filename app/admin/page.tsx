"use client"

import { useEffect, useMemo, useRef, useState } from "react"
import type { Product, ProductCategory } from "@/lib/cart-context"
import { CATEGORIES } from "@/lib/products-data"
import { CATEGORY_FACET_KEYS, FILTER_META, facetOptions } from "@/lib/product-filters"
import {
  Plus, Save, Trash2, LogOut, Search, Upload, X, Star, ArrowUp, ArrowDown,
  ImageIcon, Loader2, ExternalLink, Lock,
} from "lucide-react"

type Draft = Product

const CAT_OPTIONS = CATEGORIES.map((c) => ({ value: c.slug, label: c.label }))

function emptyDraft(): Draft {
  return {
    id: "", name: "", slug: "", category: "led-screens", tier: "basic",
    tags: [], filters: {}, description: "", dimensions: "",
    price: 0, originalPrice: 0, discount: 0, image: "", images: [],
    features: [], specs: {}, includes: [],
    deliveryFee: 0, installationFee: 0, rentalPeriod: "24h", inStock: true,
  }
}

const card = { background: "linear-gradient(135deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.02) 100%)", border: "1px solid rgba(255,255,255,0.10)" }
const inputCls = "w-full px-3 py-2 rounded-lg text-[14px] text-white bg-white/5 border border-white/10 outline-none focus:ring-2 focus:ring-[#FF2D6F]/40 placeholder:text-white/30"
const accentBtn = { background: "linear-gradient(135deg, #FF2D6F 0%, #FF5E3A 100%)" }

/* ---------- small field components ---------- */
function Field({ label, children, hint }: { label: string; children: React.ReactNode; hint?: string }) {
  return (
    <label className="block">
      <span className="block text-[11px] font-bold uppercase tracking-wider text-white/50 mb-1.5">{label}</span>
      {children}
      {hint && <span className="block text-[11px] text-white/35 mt-1">{hint}</span>}
    </label>
  )
}

function ListEditor({ value, onChange, placeholder }: { value: string[]; onChange: (v: string[]) => void; placeholder?: string }) {
  const [draft, setDraft] = useState("")
  const add = () => { const t = draft.trim(); if (!t) return; onChange([...value, t]); setDraft("") }
  return (
    <div className="space-y-2">
      {value.length > 0 && (
        <div className="space-y-1.5">
          {value.map((item, i) => (
            <div key={i} className="flex items-center gap-2">
              <input
                className={inputCls + " flex-1"}
                value={item}
                onChange={(e) => onChange(value.map((v, j) => (j === i ? e.target.value : v)))}
              />
              <button onClick={() => onChange(value.filter((_, j) => j !== i))} className="p-2 rounded-lg bg-white/5 border border-white/10 text-white/50 hover:text-red-400">
                <X className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      )}
      <div className="flex gap-2">
        <input className={inputCls + " flex-1"} value={draft} placeholder={placeholder || "Add item…"}
          onChange={(e) => setDraft(e.target.value)} onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); add() } }} />
        <button onClick={add} className="px-3 rounded-lg text-white text-[13px] font-bold" style={accentBtn}>Add</button>
      </div>
    </div>
  )
}

function KVEditor({ value, onChange, suggestKeys }: { value: Record<string, string>; onChange: (v: Record<string, string>) => void; suggestKeys?: string[] }) {
  const entries = Object.entries(value)
  const [k, setK] = useState("")
  const [v, setV] = useState("")
  const add = () => { const key = k.trim(); if (!key) return; onChange({ ...value, [key]: v.trim() }); setK(""); setV("") }
  const setKey = (oldKey: string, newKey: string) => {
    const next: Record<string, string> = {}
    for (const [kk, vv] of Object.entries(value)) next[kk === oldKey ? newKey : kk] = vv
    onChange(next)
  }
  return (
    <div className="space-y-2">
      {entries.map(([key, val]) => (
        <div key={key} className="flex items-center gap-2">
          <input className={inputCls + " w-2/5"} value={key} onChange={(e) => setKey(key, e.target.value)} />
          <input className={inputCls + " flex-1"} value={val} onChange={(e) => onChange({ ...value, [key]: e.target.value })} />
          <button onClick={() => { const n = { ...value }; delete n[key]; onChange(n) }} className="p-2 rounded-lg bg-white/5 border border-white/10 text-white/50 hover:text-red-400">
            <X className="w-4 h-4" />
          </button>
        </div>
      ))}
      {suggestKeys && suggestKeys.filter((s) => !(s in value)).length > 0 && (
        <div className="flex flex-wrap gap-1.5">
          {suggestKeys.filter((s) => !(s in value)).map((s) => (
            <button key={s} onClick={() => onChange({ ...value, [s]: "" })} className="px-2 py-1 rounded-full text-[11px] bg-white/5 border border-white/10 text-white/55 hover:text-white">+ {s}</button>
          ))}
        </div>
      )}
      <div className="flex gap-2">
        <input className={inputCls + " w-2/5"} value={k} placeholder="key" onChange={(e) => setK(e.target.value)} />
        <input className={inputCls + " flex-1"} value={v} placeholder="value" onChange={(e) => setV(e.target.value)} onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); add() } }} />
        <button onClick={add} className="px-3 rounded-lg text-white text-[13px] font-bold" style={accentBtn}>Add</button>
      </div>
    </div>
  )
}

/* ---------- main ---------- */
export default function AdminPage() {
  const [authed, setAuthed] = useState<boolean | null>(null)
  const [password, setPassword] = useState("")
  const [loginError, setLoginError] = useState("")

  const [products, setProducts] = useState<Product[]>([])
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const [draft, setDraft] = useState<Draft | null>(null)
  const [isNew, setIsNew] = useState(false)
  const [query, setQuery] = useState("")
  const [catFilter, setCatFilter] = useState<string>("")
  const [saving, setSaving] = useState(false)
  const [toast, setToast] = useState("")
  const fileRef = useRef<HTMLInputElement>(null)
  const [uploading, setUploading] = useState(false)

  useEffect(() => {
    fetch("/api/admin/login").then((r) => r.json()).then((d) => setAuthed(!!d.authed)).catch(() => setAuthed(false))
  }, [])

  const loadProducts = () => fetch("/api/admin/products").then((r) => r.json()).then((d) => setProducts(d.products || []))
  useEffect(() => { if (authed) loadProducts() }, [authed])

  const flash = (m: string) => { setToast(m); setTimeout(() => setToast(""), 2500) }

  const login = async () => {
    setLoginError("")
    const r = await fetch("/api/admin/login", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ password }) })
    if (r.ok) { setAuthed(true); setPassword("") } else setLoginError("Wrong password")
  }
  const logout = async () => { await fetch("/api/admin/login", { method: "DELETE" }); setAuthed(false) }

  const select = (p: Product) => { setSelectedId(p.id); setDraft(structuredClone(p)); setIsNew(false) }
  const startNew = () => { const d = emptyDraft(); setDraft(d); setSelectedId(null); setIsNew(true) }

  const set = <K extends keyof Draft>(key: K, val: Draft[K]) => setDraft((d) => (d ? { ...d, [key]: val } : d))

  const save = async () => {
    if (!draft) return
    setSaving(true)
    try {
      const payload = { ...draft, image: draft.images[0] || draft.image }
      const r = isNew
        ? await fetch("/api/admin/products", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) })
        : await fetch(`/api/admin/products/${draft.id}`, { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) })
      const d = await r.json()
      if (!r.ok) throw new Error(d.error || "Save failed")
      await loadProducts()
      select(d.product)
      flash(isNew ? "Product created" : "Saved")
    } catch (e: any) { flash(e.message || "Error") } finally { setSaving(false) }
  }

  const remove = async () => {
    if (!draft || isNew) return
    if (!confirm(`Delete "${draft.name}"? This cannot be undone.`)) return
    const r = await fetch(`/api/admin/products/${draft.id}`, { method: "DELETE" })
    if (r.ok) { await loadProducts(); setDraft(null); setSelectedId(null); flash("Deleted") } else flash("Delete failed")
  }

  const uploadFiles = async (files: FileList) => {
    if (!draft) return
    setUploading(true)
    try {
      const urls: string[] = []
      for (const file of Array.from(files)) {
        const fd = new FormData()
        fd.append("file", file)
        fd.append("slug", draft.slug || draft.name || "misc")
        fd.append("category", draft.category)
        const r = await fetch("/api/admin/upload", { method: "POST", body: fd })
        const d = await r.json()
        if (r.ok && d.url) urls.push(d.url)
      }
      if (urls.length) {
        const next = [...draft.images, ...urls]
        setDraft((d) => (d ? { ...d, images: next, image: next[0] } : d))
        flash(`Uploaded ${urls.length} image(s)`)
      }
    } catch { flash("Upload failed") } finally { setUploading(false) }
  }

  const setImages = (imgs: string[]) => setDraft((d) => (d ? { ...d, images: imgs, image: imgs[0] || "" } : d))

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    return products.filter((p) =>
      (!catFilter || p.category === catFilter) &&
      (!q || `${p.name} ${p.slug}`.toLowerCase().includes(q))
    )
  }, [products, query, catFilter])

  /* ----- auth gate ----- */
  if (authed === null) {
    return <div className="fixed inset-0 z-[100] grid place-items-center bg-[#070b16] text-white/60">Loading…</div>
  }
  if (!authed) {
    return (
      <div className="fixed inset-0 z-[100] grid place-items-center bg-[#070b16] px-4">
        <div className="w-full max-w-sm rounded-2xl p-6" style={card}>
          <div className="flex items-center gap-2 mb-5 text-white">
            <Lock className="w-5 h-5 text-[#FF5E3A]" /><h1 className="text-lg font-black">Catalog Admin</h1>
          </div>
          <Field label="Password">
            <input type="password" className={inputCls} value={password} autoFocus
              onChange={(e) => setPassword(e.target.value)} onKeyDown={(e) => e.key === "Enter" && login()} />
          </Field>
          {loginError && <p className="text-red-400 text-[13px] mt-2">{loginError}</p>}
          <button onClick={login} className="w-full mt-4 py-2.5 rounded-lg text-white font-bold" style={accentBtn}>Sign In</button>
          <p className="text-[11px] text-white/30 mt-3">Set <code>ADMIN_PASSWORD</code> in env. Default: <code>prime-admin</code></p>
        </div>
      </div>
    )
  }

  const catFacets = draft ? CATEGORY_FACET_KEYS[draft.category as ProductCategory] || [] : []
  const specSuggest = draft?.category === "led-screens"
    ? ["pixelPitch", "resolution", "brightness", "refreshRate", "viewingAngle", "lifespan"]
    : []

  /* ----- main UI ----- */
  return (
    <div className="fixed inset-0 z-[100] flex flex-col bg-[#070b16] text-white">
      {/* top bar */}
      <header className="flex items-center justify-between gap-4 px-5 py-3 border-b border-white/10 flex-shrink-0">
        <div className="flex items-center gap-2">
          <span className="font-black text-[15px]">Prime Line — Catalog Admin</span>
          <span className="text-[12px] text-white/40">{products.length} products</span>
        </div>
        <div className="flex items-center gap-2">
          <a href="/shop" target="_blank" className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg text-[13px] bg-white/5 border border-white/10 text-white/70 hover:text-white">
            <ExternalLink className="w-4 h-4" /> View shop
          </a>
          <button onClick={logout} className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg text-[13px] bg-white/5 border border-white/10 text-white/70 hover:text-white">
            <LogOut className="w-4 h-4" /> Logout
          </button>
        </div>
      </header>

      <div className="flex-1 min-h-0 flex">
        {/* list */}
        <aside className="w-72 flex-shrink-0 border-r border-white/10 flex flex-col">
          <div className="p-3 space-y-2 border-b border-white/10">
            <button onClick={startNew} className="w-full inline-flex items-center justify-center gap-2 py-2.5 rounded-lg text-white font-bold text-[13px]" style={accentBtn}>
              <Plus className="w-4 h-4" /> New Product
            </button>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
              <input className={inputCls + " pl-9"} placeholder="Search…" value={query} onChange={(e) => setQuery(e.target.value)} />
            </div>
            <select className={inputCls} value={catFilter} onChange={(e) => setCatFilter(e.target.value)}>
              <option value="" className="bg-[#0a0f1f]">All categories</option>
              {CAT_OPTIONS.map((c) => <option key={c.value} value={c.value} className="bg-[#0a0f1f]">{c.label}</option>)}
            </select>
          </div>
          <div className="flex-1 overflow-y-auto shop-sidebar-scroll p-2 space-y-1">
            {filtered.map((p) => (
              <button key={p.id} onClick={() => select(p)}
                className="w-full flex items-center gap-2.5 p-2 rounded-lg text-left transition-all"
                style={{ background: selectedId === p.id ? "rgba(255,45,111,0.14)" : "transparent", border: `1px solid ${selectedId === p.id ? "rgba(255,45,111,0.35)" : "transparent"}` }}>
                <div className="w-10 h-10 rounded-md bg-white/5 overflow-hidden flex-shrink-0 grid place-items-center">
                  {p.image ? <img src={p.image} alt="" className="w-full h-full object-cover" /> : <ImageIcon className="w-4 h-4 text-white/30" />}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="text-[13px] font-semibold text-white truncate flex items-center gap-1">
                    {p.featured && <Star className="w-3 h-3 text-[#FFD24A] flex-shrink-0" fill="currentColor" />}
                    {p.name}
                  </div>
                  <div className="text-[11px] text-white/40 truncate">{p.category} · ${p.price}</div>
                </div>
              </button>
            ))}
            {filtered.length === 0 && <p className="text-center text-white/40 text-[13px] py-8">No products</p>}
          </div>
        </aside>

        {/* editor */}
        <main className="flex-1 min-w-0 overflow-y-auto shop-sidebar-scroll">
          {!draft ? (
            <div className="h-full grid place-items-center text-white/40">Select a product or create a new one</div>
          ) : (
            <div className="max-w-3xl mx-auto p-6 space-y-6">
              <div className="flex items-center justify-between gap-3">
                <h2 className="text-xl font-black">{isNew ? "New Product" : draft.name || "Edit Product"}</h2>
                <div className="flex items-center gap-2">
                  {!isNew && (
                    <button onClick={remove} className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg text-[13px] bg-red-500/10 border border-red-500/30 text-red-300 hover:bg-red-500/20">
                      <Trash2 className="w-4 h-4" /> Delete
                    </button>
                  )}
                  <button onClick={save} disabled={saving} className="inline-flex items-center gap-1.5 px-5 py-2 rounded-lg text-white font-bold text-[13px] disabled:opacity-60" style={accentBtn}>
                    {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />} Save
                  </button>
                </div>
              </div>

              {/* basics */}
              <section className="rounded-xl p-4 space-y-4" style={card}>
                <div className="grid grid-cols-2 gap-4">
                  <Field label="Name"><input className={inputCls} value={draft.name} onChange={(e) => set("name", e.target.value)} /></Field>
                  <Field label="Slug" hint="URL: /shop/products/<slug>">
                    <input className={inputCls} value={draft.slug} onChange={(e) => set("slug", e.target.value)} placeholder="auto from name" />
                  </Field>
                  <Field label="Category">
                    <select className={inputCls} value={draft.category} onChange={(e) => set("category", e.target.value as ProductCategory)}>
                      {CAT_OPTIONS.map((c) => <option key={c.value} value={c.value} className="bg-[#0a0f1f]">{c.label}</option>)}
                    </select>
                  </Field>
                  <Field label="Tier">
                    <select className={inputCls} value={draft.tier} onChange={(e) => set("tier", e.target.value as any)}>
                      <option value="basic" className="bg-[#0a0f1f]">Basic</option>
                      <option value="premium" className="bg-[#0a0f1f]">Premium</option>
                    </select>
                  </Field>
                  <Field label="Dimensions / Subtitle"><input className={inputCls} value={draft.dimensions} onChange={(e) => set("dimensions", e.target.value)} /></Field>
                  <Field label="Rental Period"><input className={inputCls} value={draft.rentalPeriod} onChange={(e) => set("rentalPeriod", e.target.value)} /></Field>
                </div>
                <Field label="Description"><textarea rows={3} className={inputCls} value={draft.description} onChange={(e) => set("description", e.target.value)} /></Field>
                <div className="flex items-center gap-5">
                  <label className="flex items-center gap-2 text-[14px] text-white/80 cursor-pointer">
                    <input type="checkbox" checked={!!draft.featured} onChange={(e) => set("featured", e.target.checked as any)} /> Featured (Best Seller)
                  </label>
                  <label className="flex items-center gap-2 text-[14px] text-white/80 cursor-pointer">
                    <input type="checkbox" checked={draft.inStock} onChange={(e) => set("inStock", e.target.checked)} /> In stock
                  </label>
                </div>
              </section>

              {/* pricing */}
              <section className="rounded-xl p-4 space-y-4" style={card}>
                <h3 className="text-[13px] font-bold uppercase tracking-wider text-white/50">Pricing</h3>
                <div className="grid grid-cols-3 gap-4">
                  <Field label="Price ($)"><input type="number" className={inputCls} value={draft.price} onChange={(e) => set("price", Number(e.target.value))} /></Field>
                  <Field label="Discount (%)"><input type="number" className={inputCls} value={draft.discount} onChange={(e) => set("discount", Number(e.target.value))} /></Field>
                  <Field label="Original ($)" hint="blank = auto from discount">
                    <input type="number" className={inputCls} value={draft.originalPrice} onChange={(e) => set("originalPrice", Number(e.target.value))} />
                  </Field>
                  <Field label="Delivery Fee ($)"><input type="number" className={inputCls} value={draft.deliveryFee} onChange={(e) => set("deliveryFee", Number(e.target.value))} /></Field>
                  <Field label="Installation Fee ($)"><input type="number" className={inputCls} value={draft.installationFee} onChange={(e) => set("installationFee", Number(e.target.value))} /></Field>
                </div>
              </section>

              {/* images */}
              <section className="rounded-xl p-4 space-y-3" style={card}>
                <div className="flex items-center justify-between">
                  <h3 className="text-[13px] font-bold uppercase tracking-wider text-white/50">Images <span className="text-white/30">(first = main)</span></h3>
                  <button onClick={() => fileRef.current?.click()} disabled={uploading} className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[12px] bg-white/5 border border-white/10 text-white/80 hover:text-white">
                    {uploading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Upload className="w-4 h-4" />} Upload
                  </button>
                  <input ref={fileRef} type="file" accept="image/*" multiple hidden onChange={(e) => e.target.files && uploadFiles(e.target.files)} />
                </div>
                {draft.images.length > 0 ? (
                  <div className="grid grid-cols-4 gap-3">
                    {draft.images.map((img, i) => (
                      <div key={img + i} className="relative group rounded-lg overflow-hidden border border-white/10 aspect-[4/3] bg-white/5">
                        <img src={img} alt="" className="w-full h-full object-cover" />
                        {i === 0 && <span className="absolute top-1 left-1 px-1.5 py-0.5 rounded text-[9px] font-bold text-black" style={{ background: "#FFD24A" }}>MAIN</span>}
                        <div className="absolute inset-x-0 bottom-0 flex justify-center gap-1 p-1 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button title="Move up" onClick={() => { if (i === 0) return; const a = [...draft.images];[a[i - 1], a[i]] = [a[i], a[i - 1]]; setImages(a) }} className="p-1 text-white/80 hover:text-white"><ArrowUp className="w-3.5 h-3.5" /></button>
                          <button title="Move down" onClick={() => { if (i === draft.images.length - 1) return; const a = [...draft.images];[a[i + 1], a[i]] = [a[i], a[i + 1]]; setImages(a) }} className="p-1 text-white/80 hover:text-white"><ArrowDown className="w-3.5 h-3.5" /></button>
                          <button title="Remove" onClick={() => setImages(draft.images.filter((_, j) => j !== i))} className="p-1 text-white/80 hover:text-red-400"><X className="w-3.5 h-3.5" /></button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : <p className="text-white/40 text-[13px]">No images yet — upload or add a URL.</p>}
                <div className="flex gap-2">
                  <input className={inputCls + " flex-1"} placeholder="…or paste an image URL (/images/…)" onKeyDown={(e) => {
                    if (e.key === "Enter") { e.preventDefault(); const v = (e.target as HTMLInputElement).value.trim(); if (v) { setImages([...draft.images, v]); (e.target as HTMLInputElement).value = "" } }
                  }} />
                </div>
              </section>

              {/* features / includes */}
              <div className="grid grid-cols-2 gap-6">
                <section className="rounded-xl p-4 space-y-3" style={card}>
                  <h3 className="text-[13px] font-bold uppercase tracking-wider text-white/50">Features (chips on card)</h3>
                  <ListEditor value={draft.features} onChange={(v) => set("features", v)} placeholder="e.g. 4K-Ready Processing" />
                </section>
                <section className="rounded-xl p-4 space-y-3" style={card}>
                  <h3 className="text-[13px] font-bold uppercase tracking-wider text-white/50">What's Included</h3>
                  <ListEditor value={draft.includes} onChange={(v) => set("includes", v)} placeholder="e.g. LED Panels" />
                </section>
              </div>

              {/* specs */}
              <section className="rounded-xl p-4 space-y-3" style={card}>
                <h3 className="text-[13px] font-bold uppercase tracking-wider text-white/50">Technical Specs (key → value)</h3>
                <KVEditor value={draft.specs} onChange={(v) => set("specs", v)} suggestKeys={specSuggest} />
              </section>

              {/* filters + tags */}
              <section className="rounded-xl p-4 space-y-4" style={card}>
                <h3 className="text-[13px] font-bold uppercase tracking-wider text-white/50">Catalog Filters</h3>
                {catFacets.length > 0 ? (
                  <div className="grid grid-cols-2 gap-4">
                    {catFacets.map((key) => (
                      <Field key={key} label={FILTER_META[key]?.label || key}>
                        <select className={inputCls} value={draft.filters[key] || ""} onChange={(e) => {
                          const next = { ...draft.filters }
                          if (e.target.value) next[key] = e.target.value; else delete next[key]
                          set("filters", next)
                        }}>
                          <option value="" className="bg-[#0a0f1f]">— none —</option>
                          {facetOptions(key).map((o) => <option key={o.value} value={o.value} className="bg-[#0a0f1f]">{o.label}</option>)}
                        </select>
                      </Field>
                    ))}
                  </div>
                ) : <p className="text-white/40 text-[13px]">No predefined filters for this category.</p>}
                <div>
                  <span className="block text-[11px] font-bold uppercase tracking-wider text-white/50 mb-1.5">Advanced filter values (raw)</span>
                  <KVEditor value={draft.filters} onChange={(v) => set("filters", v)} />
                </div>
                <div>
                  <span className="block text-[11px] font-bold uppercase tracking-wider text-white/50 mb-1.5">Tags</span>
                  <ListEditor value={draft.tags} onChange={(v) => set("tags", v)} placeholder="e.g. outdoor, large-format" />
                </div>
              </section>

              <div className="flex justify-end pb-10">
                <button onClick={save} disabled={saving} className="inline-flex items-center gap-1.5 px-6 py-2.5 rounded-lg text-white font-bold text-[14px] disabled:opacity-60" style={accentBtn}>
                  {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />} Save Product
                </button>
              </div>
            </div>
          )}
        </main>
      </div>

      {toast && (
        <div className="fixed bottom-5 left-1/2 -translate-x-1/2 z-[110] px-4 py-2.5 rounded-xl text-[13px] font-semibold text-white shadow-lg" style={accentBtn}>
          {toast}
        </div>
      )}
    </div>
  )
}
