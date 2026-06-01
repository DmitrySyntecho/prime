import { NextRequest, NextResponse } from "next/server"
import { ADMIN_COOKIE, isValidToken } from "@/lib/admin-auth"
import { readProducts, createProduct } from "@/lib/admin-store"

export const runtime = "nodejs"

function guard(req: NextRequest) {
  return isValidToken(req.cookies.get(ADMIN_COOKIE)?.value)
}

export async function GET(req: NextRequest) {
  if (!guard(req)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  const products = await readProducts()
  return NextResponse.json({ products })
}

export async function POST(req: NextRequest) {
  if (!guard(req)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  const body = await req.json().catch(() => null)
  if (!body) return NextResponse.json({ error: "Invalid body" }, { status: 400 })
  const product = await createProduct(body)
  return NextResponse.json({ product })
}
