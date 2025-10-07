import { TodoList } from './TodoList'
import { CreateTodo } from './CreateTodo'

export default function TodoPage() {
  return (
    <div className="max-w-xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">TODO App</h1>
      <CreateTodo />
      <TodoList />
    </div>
  )
}
