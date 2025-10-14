import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

// GET /api/books - get all books
export async function GET() {
  const supabase = await createClient()
  const { data, error } = await supabase.from('books').select('*').order('inserted_at', { ascending: false })
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json(data)
}

// POST /api/books - create a book
export async function POST(request: Request) {
  const supabase = await createClient()
  const body = await request.json()
  const { title, author } = body
  const { data, error } = await supabase.from('books').insert({ title, author }).select()
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json(data[0])
}
