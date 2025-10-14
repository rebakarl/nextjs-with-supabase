import React, { useState } from 'react'
import { supabase } from '@/utils/supabaseClient'

export function CreateBook() {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    await supabase.from('books').insert({ title, author })
    setTitle('')
    setAuthor('')
    setLoading(false)
    window.location.reload()
  }

  return (
    <form onSubmit={handleSubmit} className="mb-4 flex gap-2">
      <input
        className="border rounded px-2 py-1 flex-1"
        value={title}
        onChange={e => setTitle(e.target.value)}
        placeholder="Book title"
        required
      />
      <input
        className="border rounded px-2 py-1 flex-1"
        value={author}
        onChange={e => setAuthor(e.target.value)}
        placeholder="Author"
        required
      />
      <button
        type="submit"
        className="bg-blue-500 text-white px-3 py-1 rounded"
        disabled={loading}
      >
        {loading ? 'Adding...' : 'Add'}
      </button>
    </form>
  )
}
