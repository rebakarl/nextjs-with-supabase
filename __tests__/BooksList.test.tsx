import React from 'react'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { BooksList } from '../app/books/BooksList'
import { vi } from 'vitest'

vi.mock('@/utils/supabaseClient', () => ({
  supabase: {
    from: vi.fn(() => ({
      select: vi.fn().mockReturnThis(),
      order: vi.fn().mockResolvedValue({ data: [
        { id: '1', title: 'Book1', author: 'Author1' },
        { id: '2', title: 'Book2', author: 'Author2' }
      ] }),
      delete: vi.fn().mockResolvedValue({}),
      update: vi.fn().mockResolvedValue({})
    }))
  }
}))

describe('BooksList', () => {
  it('renders books', async () => {
    render(<BooksList />)
    expect(screen.getByText('Loading...')).toBeInTheDocument()
    await waitFor(() => expect(screen.getByText('Book1 — Author1')).toBeInTheDocument())
    expect(screen.getByText('Book2 — Author2')).toBeInTheDocument()
  })

  it('can enter edit mode', async () => {
    render(<BooksList />)
    await waitFor(() => expect(screen.getByText('Book1 — Author1')).toBeInTheDocument())
    fireEvent.click(screen.getAllByText('Edit')[0])
    expect(screen.getByDisplayValue('Book1')).toBeInTheDocument()
    expect(screen.getByDisplayValue('Author1')).toBeInTheDocument()
  })
})
