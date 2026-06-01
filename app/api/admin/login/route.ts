import { NextRequest, NextResponse } from "next/server"
import { ADMIN_COOKIE, checkPassword, isValidToken, sessionToken } from "@/lib/admin-auth"

export const runtime = "nodejs"

export async function GET(req: NextRequest) {
  const authed = isValidToken(req.cookies.get(ADMIN_COOKIE)?.value)
  return NextResponse.json({ authed })
}

export async function POST(req: NextRequest) {
  const { password } = await req.json().catch(() => ({ password: "" }))
  if (!checkPassword(password || "")) {
    return NextResponse.json({ ok: false, error: "Invalid password" }, { status: 401 })
  }
  const res = NextResponse.json({ ok: true })
  res.cookies.set(ADMIN_COOKIE, sessionToken(), {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 30,
  })
  return res
}

export async function DELETE() {
  const res = NextResponse.json({ ok: true })
  res.cookies.set(ADMIN_COOKIE, "", { httpOnly: true, path: "/", maxAge: 0 })
  return res
}
