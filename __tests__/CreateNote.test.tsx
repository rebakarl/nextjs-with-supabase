import React from 'react'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { CreateNote } from '../app/notes/CreateNote'
import { vi } from 'vitest'

vi.mock('@/utils/supabaseClient', () => ({
  supabase: {
    auth: { getUser: vi.fn().mockResolvedValue({ data: { user: { id: 'user1' } } }) },
    from: vi.fn(() => ({
      insert: vi.fn().mockResolvedValue({}),
    }))
  }
}))

describe('CreateNote', () => {
  it('renders input and button', () => {
    render(<CreateNote />)
    expect(screen.getByPlaceholderText('Write a note...')).toBeInTheDocument()
    expect(screen.getByText('Add')).toBeInTheDocument()
  })
})
