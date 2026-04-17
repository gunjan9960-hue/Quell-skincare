import { NextRequest, NextResponse } from 'next/server'
import { getCache, setCache } from '@/lib/redis'

type CartItem = { productId: string; quantity: number }
type CartData = CartItem[]
type Session = { userId: string; phone: string }

const CART_TTL = 86400 // 24 hours

export async function POST(req: NextRequest) {
  const { sessionToken, productId } = await req.json()

  if (!sessionToken || !productId) {
    return NextResponse.json({ error: 'sessionToken and productId are required' }, { status: 400 })
  }

  const session = await getCache<Session>(`session:${sessionToken}`)
  if (!session) {
    return NextResponse.json({ error: 'Invalid or expired session' }, { status: 401 })
  }

  const cart = (await getCache<CartData>(`cart:${sessionToken}`)) ?? []

  // Add item, or increment quantity if already in cart
  const existing = cart.find((item) => item.productId === productId)
  const updated: CartData = existing
    ? cart.map((item) =>
        item.productId === productId ? { ...item, quantity: item.quantity + 1 } : item
      )
    : [...cart, { productId, quantity: 1 }]

  await setCache(`cart:${sessionToken}`, updated, CART_TTL)

  return NextResponse.json({ success: true, cart: updated })
}
