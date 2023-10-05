import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'
const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const [notification, setNotification] = useState(null)
  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if( loggedUserJSON){
        const user = JSON.parse(loggedUserJSON)
        setUser(user)
        blogService.setToken(user.token)
    }
  }, [])


  const handleLogin = async (event) => {
    event.preventDefault()
    
    try{
    const user = await loginService.login({
        username, password
    })
    window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
    )
    blogService.setToken(user.token)
    }catch(exception){
        setNotification('wrong username or password')
        setTimeout(() => {
            setNotification(null)
        }, 5000)
    }
    setUser(user)
    setUsername('')
    setPassword('')

  }

  const handleLogout = (event) => {
    event.preventDefault()
    window.localStorage.removeItem('loggedBlogappUser')
    setUser(null)
  }

  const handleCreate = async (event) => {
    event.preventDefault()
    const newBlog = {
        title,
        author,
        url
    }
    const response = blogService.create(newBlog)
    setBlogs(blogs.concat(newBlog))
    setTitle('')
    setAuthor('')
    setUrl('')
    setNotification(`a new blog ${newBlog.title} by ${newBlog.author} added`)
    setTimeout(() => {
        setNotification(null)
    }, 5000)
  }


  if(!user){
    return(
        <div>
            <Notification notification={notification}/>
            <h2>Log in to application</h2>
            <form onSubmit={handleLogin}>
                username <input type='text' value={username} onChange={({ target }) => setUsername(target.value)}/><br/>
                password <input type='password' value={password} onChange={({ target }) => setPassword(target.value)}/><br/>
                <button type='submit'>Login</button>
            </form>
        </div>
    )
  }



  return (
    <div>
        <Notification notification={notification}/>
      <h2>Blogs</h2>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
      {user.name} logged in<button onClick={handleLogout}>logout</button>
      <h2>Create New</h2>
    <form onSubmit={handleCreate}>
        title<input type='text' value={title} onChange={({ target }) => setTitle(target.value)}/><br/>
        author<input type='text' value={author} onChange={({ target }) => setAuthor(target.value)}/><br/>
        url<input type='text' value={url} onChange={({ target }) => setUrl(target.value)}/><br/>
        <button type='submit'>create</button>
    </form>
    </div>

  )
}

export default App