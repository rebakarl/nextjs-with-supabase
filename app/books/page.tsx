import { BooksList } from './BooksList'
import { CreateBook } from './CreateBook'

export default function BooksPage() {
  return (
    <div className="max-w-xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Books Example</h1>
      <CreateBook />
      <BooksList />
    </div>
  )
}
