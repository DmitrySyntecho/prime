import { NextRequest, NextResponse } from "next/server"
import { ADMIN_COOKIE, isValidToken } from "@/lib/admin-auth"
import { updateProduct, deleteProduct } from "@/lib/admin-store"

export const runtime = "nodejs"

function guard(req: NextRequest) {
  return isValidToken(req.cookies.get(ADMIN_COOKIE)?.value)
}

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  if (!guard(req)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  const { id } = await params
  const body = await req.json().catch(() => null)
  if (!body) return NextResponse.json({ error: "Invalid body" }, { status: 400 })
  const product = await updateProduct(id, body)
  if (!product) return NextResponse.json({ error: "Not found" }, { status: 404 })
  return NextResponse.json({ product })
}

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  if (!guard(req)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  const { id } = await params
  const ok = await deleteProduct(id)
  if (!ok) return NextResponse.json({ error: "Not found" }, { status: 404 })
  return NextResponse.json({ ok: true })
}
