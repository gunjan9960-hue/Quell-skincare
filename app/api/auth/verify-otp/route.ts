import { NextRequest, NextResponse } from 'next/server'
import { randomUUID } from 'crypto'
import { getCache, setCache, invalidate } from '@/lib/redis'
import { supabase } from '@/lib/supabase'

export async function POST(req: NextRequest) {
  const { phone, otp } = await req.json()

  if (!phone || !otp) {
    return NextResponse.json({ error: 'phone and otp are required' }, { status: 400 })
  }

  // Verify OTP
  const stored = await getCache<string>(`otp:${phone}`)
  if (!stored) {
    return NextResponse.json({ error: 'OTP expired or not found' }, { status: 401 })
  }
  if (stored !== otp) {
    return NextResponse.json({ error: 'Invalid OTP' }, { status: 401 })
  }

  // OTP is valid — consume it
  await invalidate(`otp:${phone}`)

  // Find or create user in Supabase
  let { data: user, error } = await supabase
    .from('users')
    .select('id, phone, name')
    .eq('phone', phone)
    .maybeSingle()

  if (error) {
    return NextResponse.json({ error: 'Database error' }, { status: 500 })
  }

  if (!user) {
    const { data: newUser, error: insertError } = await supabase
      .from('users')
      .insert({ phone })
      .select('id, phone, name')
      .single()

    if (insertError) {
      return NextResponse.json({ error: 'Failed to create user' }, { status: 500 })
    }
    user = newUser
  }

  // Create session token, store in Redis for 24 hours
  const sessionToken = randomUUID()
  await setCache(`session:${sessionToken}`, { userId: user.id, phone }, 86400)

  return NextResponse.json({
    token: sessionToken,
    user: { id: user.id, phone: user.phone, name: user.name },
  })
}
