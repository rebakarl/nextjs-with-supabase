import React from 'react'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { NotesList } from '../app/notes/NotesList'
import { vi } from 'vitest'

vi.mock('@/utils/supabaseClient', () => ({
  supabase: {
    from: vi.fn(() => ({
      select: vi.fn().mockReturnThis(),
      order: vi.fn().mockResolvedValue({ data: [
        { id: '1', content: 'Test note' },
        { id: '2', content: 'Another note' }
      ] }),
      delete: vi.fn().mockResolvedValue({}),
      update: vi.fn().mockResolvedValue({})
    }))
  }
}))

describe('NotesList', () => {
  it('renders notes', async () => {
    render(<NotesList />)
    expect(screen.getByText('Loading...')).toBeInTheDocument()
    await waitFor(() => expect(screen.getByText('Test note')).toBeInTheDocument())
    expect(screen.getByText('Another note')).toBeInTheDocument()
  })

  it('can enter edit mode', async () => {
    render(<NotesList />)
    await waitFor(() => expect(screen.getByText('Test note')).toBeInTheDocument())
    fireEvent.click(screen.getAllByText('Edit')[0])
    expect(screen.getByDisplayValue('Test note')).toBeInTheDocument()
  })
})
