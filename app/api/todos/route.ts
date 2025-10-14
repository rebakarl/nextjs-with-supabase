import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

// GET /api/todos - get all todos
export async function GET() {
  const supabase = await createClient()
  const { data, error } = await supabase.from('todos').select('*').order('inserted_at', { ascending: false })
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json(data)
}

// POST /api/todos - create a todo
export async function POST(request: Request) {
  const supabase = await createClient()
  const body = await request.json()
  const { task, user_id } = body
  const { data, error } = await supabase.from('todos').insert({ task, user_id }).select()
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json(data[0])
}
