import React from 'react'
'use client'
import { useEffect, useState } from 'react'
import { supabase } from '@/utils/supabaseClient'

export function NotesList() {
  const [notes, setNotes] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [editId, setEditId] = useState<string | null>(null)
  const [editContent, setEditContent] = useState('')

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
          {editId === note.id ? (
            <>
              <input
                className="border rounded px-2 py-1 flex-1 mr-2"
                value={editContent}
                onChange={e => setEditContent(e.target.value)}
                autoFocus
              />
              <button
                className="text-green-600 hover:underline mr-2"
                onClick={async () => {
                  await supabase.from('notes').update({ content: editContent }).eq('id', note.id)
                  setEditId(null)
                  setEditContent('')
                  fetchNotes()
                }}
              >
                Save
              </button>
              <button
                className="text-gray-500 hover:underline mr-2"
                onClick={() => {
                  setEditId(null)
                  setEditContent('')
                }}
              >
                Cancel
              </button>
            </>
          ) : (
            <>
              <span>{note.content}</span>
              <div>
                <button
                  className="text-blue-500 hover:underline mr-2"
                  onClick={() => {
                    setEditId(note.id)
                    setEditContent(note.content)
                  }}
                >
                  Edit
                </button>
                <button
                  className="text-red-500 hover:underline"
                  onClick={() => handleDelete(note.id)}
                >
                  Delete
                </button>
              </div>
            </>
          )}
        </li>
      ))}
    </ul>
  )
}
