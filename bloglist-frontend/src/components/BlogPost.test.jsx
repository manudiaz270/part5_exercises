import React from 'react'
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import BlogPost from './BlogPost'
test('the event handler is called with the correct properties', async () => {
  const createBlog = jest.fn()
  const user = userEvent.setup()


  render(<BlogPost createBlog={createBlog}/>)

  const inputs = screen.getAllByRole('textbox')

  const button = screen.getByText('create')

  await user.type(inputs[0], 'title')
  await user.type(inputs[1], 'author')
  await user.type(inputs[2], 'url')
  await user.click(button)

  expect(createBlog.mock.calls[0]).toStrictEqual([{ 'author': 'author', 'title': 'title', 'url': 'url' }])

})