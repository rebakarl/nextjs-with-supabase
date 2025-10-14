import React, { useEffect, useState } from 'react'
import { supabase } from '@/utils/supabaseClient'

export function BooksList() {
  const [books, setBooks] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [editId, setEditId] = useState<string | null>(null)
  const [editTitle, setEditTitle] = useState('')
  const [editAuthor, setEditAuthor] = useState('')

  useEffect(() => {
    fetchBooks()
  }, [])

  async function fetchBooks() {
    setLoading(true)
    const { data } = await supabase
      .from('books')
      .select('*')
      .order('inserted_at', { ascending: false })
    setBooks(data || [])
    setLoading(false)
  }

  async function handleDelete(id: string) {
    await supabase.from('books').delete().eq('id', id)
    fetchBooks()
  }

  async function handleUpdate(id: string) {
    await supabase.from('books').update({ title: editTitle, author: editAuthor }).eq('id', id)
    setEditId(null)
    setEditTitle('')
    setEditAuthor('')
    fetchBooks()
  }

  if (loading) return <div>Loading...</div>
  if (!books.length) return <div>No books yet.</div>

  return (
    <ul className="space-y-2">
      {books.map(book => (
        <li key={book.id} className="flex justify-between items-center bg-gray-100 p-2 rounded">
          {editId === book.id ? (
            <>
              <input
                className="border rounded px-2 py-1 flex-1 mr-2"
                value={editTitle}
                onChange={e => setEditTitle(e.target.value)}
                placeholder="Title"
                autoFocus
              />
              <input
                className="border rounded px-2 py-1 flex-1 mr-2"
                value={editAuthor}
                onChange={e => setEditAuthor(e.target.value)}
                placeholder="Author"
              />
              <button
                className="text-green-600 hover:underline mr-2"
                onClick={() => handleUpdate(book.id)}
              >
                Save
              </button>
              <button
                className="text-gray-500 hover:underline mr-2"
                onClick={() => {
                  setEditId(null)
                  setEditTitle('')
                  setEditAuthor('')
                }}
              >
                Cancel
              </button>
            </>
          ) : (
            <>
              <span>{book.title} — {book.author}</span>
              <div>
                <button
                  className="text-blue-500 hover:underline mr-2"
                  onClick={() => {
                    setEditId(book.id)
                    setEditTitle(book.title)
                    setEditAuthor(book.author)
                  }}
                >
                  Edit
                </button>
                <button
                  className="text-red-500 hover:underline"
                  onClick={() => handleDelete(book.id)}
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
