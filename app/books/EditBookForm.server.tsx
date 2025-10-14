import { updateBook } from './updateBook.server'

export function EditBookForm({ id, initialTitle, initialAuthor }: { id: string, initialTitle: string, initialAuthor: string }) {
  async function action(formData: FormData) {
    'use server'
    const title = formData.get('title') as string
    const author = formData.get('author') as string
    await updateBook(id, title, author)
  }

  return (
    <form action={action} className="flex gap-2">
      <input
        name="title"
        defaultValue={initialTitle}
        className="border rounded px-2 py-1 flex-1"
        required
      />
      <input
        name="author"
        defaultValue={initialAuthor}
        className="border rounded px-2 py-1 flex-1"
        required
      />
      <button type="submit" className="text-green-600 hover:underline">Save</button>
    </form>
  )
}
