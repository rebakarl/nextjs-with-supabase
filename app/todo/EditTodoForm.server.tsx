import { updateTodo } from './updateTodo.server'

export function EditTodoForm({ id, initialTask }: { id: string, initialTask: string }) {
  async function action(formData: FormData) {
    'use server'
    const task = formData.get('task') as string
    await updateTodo(id, task)
  }

  return (
    <form action={action} className="flex gap-2">
      <input
        name="task"
        defaultValue={initialTask}
        className="border rounded px-2 py-1 flex-1"
        required
      />
      <button type="submit" className="text-green-600 hover:underline">Save</button>
    </form>
  )
}
