import { updateNote } from './updateNote.server'

export function EditNoteForm({ id, initialContent }: { id: string, initialContent: string }) {
  async function action(formData: FormData) {
    'use server'
    const content = formData.get('content') as string
    await updateNote(id, content)
  }

  return (
    <form action={action} className="flex gap-2">
      <input
        name="content"
        defaultValue={initialContent}
        className="border rounded px-2 py-1 flex-1"
        required
      />
      <button type="submit" className="text-green-600 hover:underline">Save</button>
    </form>
  )
}
