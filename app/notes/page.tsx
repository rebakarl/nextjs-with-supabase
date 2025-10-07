import { NotesList } from './NotesList'
import { CreateNote } from './CreateNote'

export default function NotesPage() {
  return (
    <div className="max-w-xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Notes Example</h1>
      <CreateNote />
      <NotesList />
    </div>
  )
}