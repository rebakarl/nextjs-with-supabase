import React from 'react'
'use client'
import { useState } from 'react'
import { supabase } from '@/utils/supabaseClient'

export function CreateNote() {
  const [content, setContent] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    const user = supabase.auth.getUser()
    await supabase.from('notes').insert({ content, user_id: (await user).data.user?.id })
    setContent('')
    setLoading(false)
    window.location.reload()
  }

  return (
    <form onSubmit={handleSubmit} className="mb-4 flex gap-2">
      <input
        className="border rounded px-2 py-1 flex-1"
        value={content}
        onChange={e => setContent(e.target.value)}
        placeholder="Write a note..."
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
