import { NextRequest, NextResponse } from 'next/server'
import { getCache, setCache, invalidate } from '@/lib/redis'

type CartItem = { productId: string; quantity: number }
type CartData = CartItem[]
type Session = { userId: string; phone: string }

const CART_TTL = 86400 // 24 hours

export async function DELETE(req: NextRequest) {
  const { sessionToken, productId } = await req.json()

  if (!sessionToken || !productId) {
    return NextResponse.json({ error: 'sessionToken and productId are required' }, { status: 400 })
  }

  const session = await getCache<Session>(`session:${sessionToken}`)
  if (!session) {
    return NextResponse.json({ error: 'Invalid or expired session' }, { status: 401 })
  }

  const cart = (await getCache<CartData>(`cart:${sessionToken}`)) ?? []

  // Decrement quantity; remove item entirely when it reaches 0
  const updated = cart
    .map((item) =>
      item.productId === productId ? { ...item, quantity: item.quantity - 1 } : item
    )
    .filter((item) => item.quantity > 0)

  if (updated.length === 0) {
    await invalidate(`cart:${sessionToken}`)
  } else {
    await setCache(`cart:${sessionToken}`, updated, CART_TTL)
  }

  return NextResponse.json({ success: true, cart: updated })
}
