import { NextRequest, NextResponse } from 'next/server'
import Razorpay from 'razorpay'
import { getCache } from '@/lib/redis'
import { supabase } from '@/lib/supabase'

export const dynamic = "force-dynamic";

type Session = { userId: string; phone: string }

export async function POST(req: NextRequest) {
  const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID!,
    key_secret: process.env.RAZORPAY_KEY_SECRET!,
  })
  const { sessionToken, productId, shippingAddress } = await req.json()

  if (!sessionToken || !productId || !shippingAddress) {
    return NextResponse.json(
      { error: 'sessionToken, productId, and shippingAddress are required' },
      { status: 400 }
    )
  }

  // Validate session
  const session = await getCache<Session>(`session:${sessionToken}`)
  if (!session) {
    return NextResponse.json({ error: 'Invalid or expired session' }, { status: 401 })
  }

  // Get product price from Supabase
  const { data: product, error: productError } = await supabase
    .from('products')
    .select('id, name, price_paise')
    .eq('id', productId)
    .single()

  if (productError || !product) {
    return NextResponse.json({ error: 'Product not found' }, { status: 404 })
  }

  // Create Razorpay order
  const razorpayOrder = await razorpay.orders.create({
    amount: product.price_paise,
    currency: 'INR',
    receipt: `quell_${Date.now()}`,
    notes: {
      userId: session.userId,
      productId: product.id,
      productName: product.name,
    },
  })

  // Save pending order in Supabase
  const { data: order, error: orderError } = await supabase
    .from('orders')
    .insert({
      user_id: session.userId,
      product_id: productId,
      amount_paise: product.price_paise,
      status: 'pending',
      razorpay_order_id: razorpayOrder.id,
      shipping_address: shippingAddress,
    })
    .select('id')
    .single()

  if (orderError || !order) {
    return NextResponse.json({ error: 'Failed to create order' }, { status: 500 })
  }

  return NextResponse.json({
    orderId: order.id,
    razorpayOrderId: razorpayOrder.id,
    amount: product.price_paise,
    currency: 'INR',
    keyId: process.env.RAZORPAY_KEY_ID,
  })
}
