import React from 'react'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { CreateTodo } from '../app/todo/CreateTodo'
import { vi } from 'vitest'

vi.mock('@/utils/supabaseClient', () => ({
  supabase: {
    auth: { getUser: vi.fn().mockResolvedValue({ data: { user: { id: 'user1' } } }) },
    from: vi.fn(() => ({
      insert: vi.fn().mockResolvedValue({}),
    }))
  }
}))

describe('CreateTodo', () => {
  it('renders input and button', () => {
    render(<CreateTodo />)
    expect(screen.getByPlaceholderText('Add a todo...')).toBeInTheDocument()
    expect(screen.getByText('Add')).toBeInTheDocument()
  })
})
