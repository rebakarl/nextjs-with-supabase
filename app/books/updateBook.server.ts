import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'

export async function updateBook(id: string, title: string, author: string) {
  const supabase = await createClient()
  await supabase.from('books').update({ title, author }).eq('id', id)
  revalidatePath('/books')
}
