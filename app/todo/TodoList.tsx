'use client'
import { useEffect, useState } from 'react'
import { supabase } from '@/utils/supabaseClient'

export function TodoList() {
  const [todos, setTodos] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchTodos()
  }, [])

  async function fetchTodos() {
    setLoading(true)
    const { data } = await supabase
      .from('todos')
      .select('*')
      .order('inserted_at', { ascending: false })
    setTodos(data || [])
    setLoading(false)
  }

  async function handleDelete(id: string) {
    await supabase.from('todos').delete().eq('id', id)
    fetchTodos()
  }

  if (loading) return <div>Loading...</div>
  if (!todos.length) return <div>No todos yet.</div>

  return (
    <ul className="space-y-2">
      {todos.map(todo => (
        <li key={todo.id} className="flex justify-between items-center bg-gray-100 p-2 rounded">
          <span>{todo.task}</span>
          <button
            className="text-red-500 hover:underline"
            onClick={() => handleDelete(todo.id)}
          >
            Delete
          </button>
        </li>
      ))}
    </ul>
  )
}
