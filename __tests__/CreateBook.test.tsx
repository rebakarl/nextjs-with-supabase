import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import { CreateBook } from '../app/books/CreateBook'

describe('CreateBook', () => {
  it('renders input and button', () => {
    render(<CreateBook />)
    expect(screen.getByPlaceholderText('Book title')).toBeInTheDocument()
    expect(screen.getByPlaceholderText('Author')).toBeInTheDocument()
    expect(screen.getByText('Add')).toBeInTheDocument()
  })
})
