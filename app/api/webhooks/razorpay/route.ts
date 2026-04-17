import { NextRequest, NextResponse } from 'next/server'
import { createHmac } from 'crypto'
import twilio from 'twilio'
import { supabase } from '@/lib/supabase'

const twilioClient = twilio(
  process.env.TWILIO_ACCOUNT_SID!,
  process.env.TWILIO_AUTH_TOKEN!
)

export async function POST(req: NextRequest) {
  const rawBody = await req.text()
  const signature = req.headers.get('x-razorpay-signature')

  if (!signature) {
    return NextResponse.json({ error: 'Missing signature' }, { status: 400 })
  }

  // Verify webhook signature
  const expectedSignature = createHmac('sha256', process.env.RAZORPAY_WEBHOOK_SECRET!)
    .update(rawBody)
    .digest('hex')

  if (expectedSignature !== signature) {
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 })
  }

  const event = JSON.parse(rawBody)

  if (event.event !== 'payment.captured') {
    return NextResponse.json({ received: true })
  }

  const razorpayOrderId = event.payload.payment.entity.order_id

  // Mark order as paid and fetch order + product + user in one go
  const { data: order, error: orderError } = await supabase
    .from('orders')
    .update({ status: 'paid' })
    .eq('razorpay_order_id', razorpayOrderId)
    .select('id, user_id, product_id')
    .single()

  if (orderError || !order) {
    console.error('[webhook] Order update failed:', orderError)
    return NextResponse.json({ error: 'Order not found' }, { status: 404 })
  }

  // Fetch product name and user phone in parallel
  const [{ data: product }, { data: user }] = await Promise.all([
    supabase.from('products').select('name').eq('id', order.product_id).single(),
    supabase.from('users').select('phone').eq('id', order.user_id).single(),
  ])

  if (user?.phone && product?.name) {
    await twilioClient.messages.create({
      from: `whatsapp:${process.env.TWILIO_WHATSAPP_FROM}`,
      to: `whatsapp:${user.phone}`,
      body:
        `Your QUELL order is confirmed! 🎉\n\n` +
        `Your ${product.name} will be shipped within 2 business days.\n\n` +
        `Order ID: ${order.id}`,
    })
  }

  return NextResponse.json({ received: true })
}
