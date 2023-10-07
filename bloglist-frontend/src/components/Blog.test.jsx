import React from 'react'
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'
test('renders only author and title', () => {
  const blog = {
    'author': 'a',
    'title': 'b',
    'url': 'c',
    'user': {
      'username': 'd',
      'name': 'e'
    }
  }
  const { container } = render(<Blog blog={blog}/>)
  let div = container.querySelector('.big')
  expect(div).toHaveStyle('display: none')
  div = container.querySelector('.small')
  expect(div).toBeDefined()
})

test('url and likes are shown after button press', async () => {
  const blog = {
    'author': 'a',
    'title': 'b',
    'url': 'c',
    'user': {
      'username': 'd',
      'name': 'e'
    }
  }
  const { container } = render(<Blog blog={blog}/>)
  const user = userEvent.setup()
  const button = screen.getByText('show')
  await user.click(button)
  const div = container.querySelector('.big')
  expect(div).not.toHaveStyle('display: none')

})

test('if like button is clicked twice the event handler is called twice', async () => {
  const blog = {
    'author': 'a',
    'title': 'b',
    'url': 'c',
    'user': {
      'username': 'd',
      'name': 'e'
    }
  }
  const mockHandler = jest.fn()
  render(<Blog blog={blog} handleLike={mockHandler}/>)
  const user = userEvent.setup()
  const button = screen.getByText('like')
  await user.click(button)
  await user.click(button)
  expect(mockHandler.mock.calls).toHaveLength(2)
})
