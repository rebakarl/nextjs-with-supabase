'use client'
import { useEffect, useState } from 'react'
import { supabase } from '@/utils/supabaseClient'

export function NotesList() {
  const [notes, setNotes] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchNotes()
  }, [])

  async function fetchNotes() {
    setLoading(true)
    const { data } = await supabase
      .from('notes')
      .select('*')
      .order('inserted_at', { ascending: false })
    setNotes(data || [])
    setLoading(false)
  }

  async function handleDelete(id: string) {
    await supabase.from('notes').delete().eq('id', id)
    fetchNotes()
  }

  if (loading) return <div>Loading...</div>
  if (!notes.length) return <div>No notes yet.</div>

  return (
    <ul className="space-y-2">
      {notes.map(note => (
        <li key={note.id} className="flex justify-between items-center bg-gray-100 p-2 rounded">
          <span>{note.content}</span>
          <button
            className="text-red-500 hover:underline"
            onClick={() => handleDelete(note.id)}
          >
            Delete
          </button>
        </li>
      ))}
    </ul>
  )
}
