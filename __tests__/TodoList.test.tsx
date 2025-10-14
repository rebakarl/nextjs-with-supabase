import React from 'react'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { TodoList } from '../app/todo/TodoList'
import { vi } from 'vitest'

vi.mock('@/utils/supabaseClient', () => ({
  supabase: {
    from: vi.fn(() => ({
      select: vi.fn().mockReturnThis(),
      order: vi.fn().mockResolvedValue({ data: [
        { id: '1', task: 'Test todo' },
        { id: '2', task: 'Another todo' }
      ] }),
      delete: vi.fn().mockResolvedValue({}),
      update: vi.fn().mockResolvedValue({})
    }))
  }
}))

describe('TodoList', () => {
  it('renders todos', async () => {
    render(<TodoList />)
    expect(screen.getByText('Loading...')).toBeInTheDocument()
    await waitFor(() => expect(screen.getByText('Test todo')).toBeInTheDocument())
    expect(screen.getByText('Another todo')).toBeInTheDocument()
  })

  it('can enter edit mode', async () => {
    render(<TodoList />)
    await waitFor(() => expect(screen.getByText('Test todo')).toBeInTheDocument())
    fireEvent.click(screen.getAllByText('Edit')[0])
    expect(screen.getByDisplayValue('Test todo')).toBeInTheDocument()
  })
})
