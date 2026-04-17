import { NextRequest, NextResponse } from 'next/server'
import { createHmac } from 'crypto'
import { supabase } from '@/lib/supabase'

export async function POST(req: NextRequest) {
  const { razorpayOrderId, razorpayPaymentId, razorpaySignature } = await req.json()

  if (!razorpayOrderId || !razorpayPaymentId || !razorpaySignature) {
    return NextResponse.json(
      { error: 'razorpayOrderId, razorpayPaymentId, and razorpaySignature are required' },
      { status: 400 }
    )
  }

  // Verify HMAC SHA256 signature
  const expectedSignature = createHmac('sha256', process.env.RAZORPAY_KEY_SECRET!)
    .update(`${razorpayOrderId}|${razorpayPaymentId}`)
    .digest('hex')

  if (expectedSignature !== razorpaySignature) {
    return NextResponse.json({ error: 'Invalid payment signature' }, { status: 400 })
  }

  // Mark order as paid in Supabase
  const { error } = await supabase
    .from('orders')
    .update({ status: 'paid' })
    .eq('razorpay_order_id', razorpayOrderId)

  if (error) {
    return NextResponse.json({ error: 'Failed to update order status' }, { status: 500 })
  }

  return NextResponse.json({ success: true })
}
