import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import BlogPost from './components/BlogPost'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [notification, setNotification] = useState(null)
  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs.sort((a, b) => b.likes - a.likes) )
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

  const handleCreate = async (newBlog) => {
    
    const response = await blogService.create(newBlog)
    console.log(response);
    setBlogs(blogs.concat(response))
    setNotification(`a new blog ${newBlog.title} by ${newBlog.author} added`)
    setTimeout(() => {
        setNotification(null)
    }, 5000)
  }

  const handleLike = async (originalBlog) => {
    const newBlog = await blogService.like(originalBlog)
    setBlogs(blogs.filter(blog => blog.id !== originalBlog.id))
    setBlogs(blogs.concat(newBlog))
  }

  const handleDelete = async (blog) => {

    if(window.confirm('Do you really want to delete this blog post?')){
        const response = await blogService.remove(blog)
        setBlogs(blogs.filter(a => a.id !== blog.id))
    }
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
      {() => sortBlogs(blogs)}
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} handleLike={handleLike} handleDelete={handleDelete}/>
      )}
      {user.name} logged in<button onClick={handleLogout}>logout</button>
      <h2>Create New</h2>
      <Togglable buttonLabel='create new blog'>
        <BlogPost createBlog={handleCreate}/>
      </Togglable>
    </div>

  )
}

export default App