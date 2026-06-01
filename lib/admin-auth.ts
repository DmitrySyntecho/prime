import { createHash, timingSafeEqual } from "crypto"

export const ADMIN_COOKIE = "pl_admin"

function adminPassword(): string {
  return process.env.ADMIN_PASSWORD || "prime-admin"
}

/** Opaque session token derived from the password (raw password never stored in the cookie). */
export function sessionToken(): string {
  return createHash("sha256").update("plav::" + adminPassword()).digest("hex")
}

export function checkPassword(input: string): boolean {
  const a = Buffer.from(String(input))
  const b = Buffer.from(adminPassword())
  if (a.length !== b.length) return false
  return timingSafeEqual(a, b)
}

export function isValidToken(token: string | undefined): boolean {
  if (!token) return false
  const a = Buffer.from(token)
  const b = Buffer.from(sessionToken())
  if (a.length !== b.length) return false
  return timingSafeEqual(a, b)
}
