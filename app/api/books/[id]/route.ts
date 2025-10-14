import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

// GET /api/books/[id] - get a single book
export async function GET(_request: Request, { params }: { params: { id: string } }) {
  const supabase = await createClient()
  const { data, error } = await supabase.from('books').select('*').eq('id', params.id).single()
  if (error) return NextResponse.json({ error: error.message }, { status: 404 })
  return NextResponse.json(data)
}

// PUT /api/books/[id] - update a book
export async function PUT(request: Request, { params }: { params: { id: string } }) {
  const supabase = await createClient()
  const body = await request.json()
  const { title, author } = body
  const { data, error } = await supabase.from('books').update({ title, author }).eq('id', params.id).select()
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json(data[0])
}

// DELETE /api/books/[id] - delete a book
export async function DELETE(_request: Request, { params }: { params: { id: string } }) {
  const supabase = await createClient()
  const { error } = await supabase.from('books').delete().eq('id', params.id)
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ success: true })
}
