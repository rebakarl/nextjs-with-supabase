import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'

export async function updateNote(id: string, content: string) {
  const supabase = await createClient()
  await supabase.from('notes').update({ content }).eq('id', id)
  revalidatePath('/notes')
}
