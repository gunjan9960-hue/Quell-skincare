import { NextRequest, NextResponse } from 'next/server'
import twilio from 'twilio'
import { setCache } from '@/lib/redis'

const client = twilio(
  process.env.TWILIO_ACCOUNT_SID!,
  process.env.TWILIO_AUTH_TOKEN!
)

export async function POST(req: NextRequest) {
  const { phone } = await req.json()

  if (!phone || !/^\+[1-9]\d{7,14}$/.test(phone)) {
    return NextResponse.json(
      { error: 'Invalid phone number. Use E.164 format, e.g. +919876543210' },
      { status: 400 }
    )
  }

  const otp = Math.floor(100000 + Math.random() * 900000).toString()

  // Store OTP in Redis with 5-minute expiry
  await setCache(`otp:${phone}`, otp, 300)

  await client.messages.create({
    from: `whatsapp:${process.env.TWILIO_WHATSAPP_FROM}`,
    to: `whatsapp:${phone}`,
    body: `Your QUELL verification code is: ${otp}\n\nValid for 5 minutes. Do not share this with anyone.`,
  })

  return NextResponse.json({ success: true })
}
