"use client"

import { createContext, useContext, useState, useCallback, type ReactNode } from "react"

export type ProductCategory =
  | "led-screens"
  | "dj-setups"
  | "sound-systems"
  | "lighting"
  | "stage"
  | "pipe-drape"
  | "tv"

export type ProductTier = "basic" | "premium"

export interface Product {
  id: string
  name: string
  slug: string
  category: ProductCategory
  /** pricing/scale tier within its category */
  tier: ProductTier
  /** facet tags for filtering (e.g. "indoor", "outdoor", "large-format") */
  tags: string[]
  /** category-specific filter values (e.g. { pitch: "P2.6mm", capacity: "1000" }) */
  filters: Record<string, string>
  description: string
  dimensions: string
  price: number
  originalPrice: number
  discount: number
  image: string
  /** All photos of this model — image is always images[0]. */
  images: string[]
  features: string[]
  /** Flexible spec sheet — keys vary by category. */
  specs: Record<string, string>
  includes: string[]
  deliveryFee: number
  installationFee: number
  rentalPeriod: string
  inStock: boolean
  featured?: boolean
}

export interface CartItem {
  product: Product
  quantity: number
  rentalDays: number
}

interface CartContextType {
  items: CartItem[]
  addItem: (product: Product, quantity?: number, rentalDays?: number) => void
  removeItem: (productId: string) => void
  updateQuantity: (productId: string, quantity: number) => void
  updateRentalDays: (productId: string, days: number) => void
  clearCart: () => void
  getSubtotal: () => number
  getDeliveryTotal: () => number
  getInstallationTotal: () => number
  getSavings: () => number
  getTotal: () => number
  itemCount: number
  isCartOpen: boolean
  openCart: () => void
  closeCart: () => void
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([])
  const [isCartOpen, setIsCartOpen] = useState(false)

  const openCart = useCallback(() => setIsCartOpen(true), [])
  const closeCart = useCallback(() => setIsCartOpen(false), [])

  const addItem = useCallback((product: Product, quantity = 1, rentalDays = 1) => {
    setItems((prev) => {
      const existing = prev.find((item) => item.product.id === product.id)
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        )
      }
      return [...prev, { product, quantity, rentalDays }]
    })
  }, [])

  const removeItem = useCallback((productId: string) => {
    setItems((prev) => prev.filter((item) => item.product.id !== productId))
  }, [])

  const updateQuantity = useCallback((productId: string, quantity: number) => {
    if (quantity < 1) return
    setItems((prev) =>
      prev.map((item) =>
        item.product.id === productId ? { ...item, quantity } : item
      )
    )
  }, [])

  const updateRentalDays = useCallback((productId: string, days: number) => {
    if (days < 1) return
    setItems((prev) =>
      prev.map((item) =>
        item.product.id === productId ? { ...item, rentalDays: days } : item
      )
    )
  }, [])

  const clearCart = useCallback(() => {
    setItems([])
  }, [])

  const getSubtotal = useCallback(() => {
    return items.reduce((sum, item) => sum + item.product.price * item.quantity * item.rentalDays, 0)
  }, [items])

  const getDeliveryTotal = useCallback(() => {
    return items.reduce((sum, item) => sum + item.product.deliveryFee * item.quantity, 0)
  }, [items])

  const getInstallationTotal = useCallback(() => {
    return items.reduce((sum, item) => sum + item.product.installationFee * item.quantity, 0)
  }, [items])

  const getSavings = useCallback(() => {
    return items.reduce(
      (sum, item) => sum + (item.product.originalPrice - item.product.price) * item.quantity * item.rentalDays,
      0
    )
  }, [items])

  const getTotal = useCallback(() => {
    return getSubtotal() + getDeliveryTotal() + getInstallationTotal()
  }, [getSubtotal, getDeliveryTotal, getInstallationTotal])

  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0)

  return (
    <CartContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        updateQuantity,
        updateRentalDays,
        clearCart,
        getSubtotal,
        getDeliveryTotal,
        getInstallationTotal,
        getSavings,
        getTotal,
        itemCount,
        isCartOpen,
        openCart,
        closeCart,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error("useCart must be used within a CartProvider")
  }
  return context
}
