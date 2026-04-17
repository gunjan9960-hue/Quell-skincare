import { NextRequest, NextResponse } from 'next/server'
import { getCache } from '@/lib/redis'
import { supabase } from '@/lib/supabase'

type CartItem = { productId: string; quantity: number }
type CartData = CartItem[]
type Session = { userId: string; phone: string }

export async function GET(req: NextRequest) {
  const sessionToken = req.headers.get('x-session-token')
  if (!sessionToken) {
    return NextResponse.json({ error: 'Missing session token' }, { status: 401 })
  }

  const session = await getCache<Session>(`session:${sessionToken}`)
  if (!session) {
    return NextResponse.json({ error: 'Invalid or expired session' }, { status: 401 })
  }

  const cart = (await getCache<CartData>(`cart:${sessionToken}`)) ?? []

  if (cart.length === 0) {
    return NextResponse.json([])
  }

  const productIds = cart.map((item) => item.productId)
  const { data: products, error } = await supabase
    .from('products')
    .select('id, name, size_ml, price_paise, duration_days')
    .in('id', productIds)

  if (error) {
    return NextResponse.json({ error: 'Failed to fetch product details' }, { status: 500 })
  }

  const enriched = cart.map((item) => ({
    productId: item.productId,
    quantity: item.quantity,
    product: products.find((p) => p.id === item.productId) ?? null,
  }))

  return NextResponse.json(enriched)
}
