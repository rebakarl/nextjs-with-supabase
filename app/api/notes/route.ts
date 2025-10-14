import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

// GET /api/notes - get all notes
export async function GET() {
  const supabase = await createClient()
  const { data, error } = await supabase.from('notes').select('*').order('inserted_at', { ascending: false })
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json(data)
}

// POST /api/notes - create a note
export async function POST(request: Request) {
  const supabase = await createClient()
  const body = await request.json()
  const { content, user_id } = body
  const { data, error } = await supabase.from('notes').insert({ content, user_id }).select()
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json(data[0])
}
