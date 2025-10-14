'use client'
import { useEffect, useState } from 'react'
import { supabase } from '@/utils/supabaseClient'

export function TodoList() {
  const [todos, setTodos] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [editId, setEditId] = useState<string | null>(null)
  const [editTask, setEditTask] = useState('')

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
          {editId === todo.id ? (
            <>
              <input
                className="border rounded px-2 py-1 flex-1 mr-2"
                value={editTask}
                onChange={e => setEditTask(e.target.value)}
                autoFocus
              />
              <button
                className="text-green-600 hover:underline mr-2"
                onClick={async () => {
                  await supabase.from('todos').update({ task: editTask }).eq('id', todo.id)
                  setEditId(null)
                  setEditTask('')
                  fetchTodos()
                }}
              >
                Save
              </button>
              <button
                className="text-gray-500 hover:underline mr-2"
                onClick={() => {
                  setEditId(null)
                  setEditTask('')
                }}
              >
                Cancel
              </button>
            </>
          ) : (
            <>
              <span>{todo.task}</span>
              <div>
                <button
                  className="text-blue-500 hover:underline mr-2"
                  onClick={() => {
                    setEditId(todo.id)
                    setEditTask(todo.task)
                  }}
                >
                  Edit
                </button>
                <button
                  className="text-red-500 hover:underline"
                  onClick={() => handleDelete(todo.id)}
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
