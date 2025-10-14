import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'

export async function updateTodo(id: string, task: string) {
  const supabase = await createClient()
  await supabase.from('todos').update({ task }).eq('id', id)
  revalidatePath('/todo')
}
