import { NextRequest, NextResponse } from "next/server"
import { ADMIN_COOKIE, isValidToken } from "@/lib/admin-auth"
import { reorderProducts } from "@/lib/admin-store"

export const runtime = "nodejs"

export async function POST(req: NextRequest) {
  if (!isValidToken(req.cookies.get(ADMIN_COOKIE)?.value)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }
  const { orderedIds } = await req.json().catch(() => ({ orderedIds: null }))
  if (!Array.isArray(orderedIds)) return NextResponse.json({ error: "Invalid body" }, { status: 400 })
  await reorderProducts(orderedIds.map(String))
  return NextResponse.json({ ok: true })
}
