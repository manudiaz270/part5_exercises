import { useState } from 'react'
const BlogPost = ({ createBlog }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const handleSubmit = (event) => {
    event.preventDefault()
    createBlog({
      title,
      author,
      url
    })
    setTitle('')
    setAuthor('')
    setUrl('')
  }

  return(
    <div>
      <form onSubmit={handleSubmit}>
                title<input type='text' value={title} onChange={({ target }) => setTitle(target.value)} className='title'/><br/>
                author<input type='text' value={author} onChange={({ target }) => setAuthor(target.value)} className='author'/><br/>
                url<input type='text' value={url} onChange={({ target }) => setUrl(target.value)} className='url'/><br/>
        <button type='submit' className='create-button'>create</button>
      </form>
    </div>
  )
}
export default BlogPost