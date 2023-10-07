import { useState } from 'react'
import PropTypes from 'prop-types'
const Blog = ({ blog, handleLike, handleDelete, user }) => {
  const [showDetails, setShowDetails] = useState(false)
  const hideWhenVisible = { display: showDetails? 'none' : '' }
  let removeVisibility
  if(user.username === blog.user.username){
    removeVisibility = { display: '' }
  }else{
    removeVisibility = { display:'none' }
  }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
    display: showDetails? '': 'none'
  }

  return(
    <div>
      <div style={blogStyle} className='big'>
        <p id='titleAndAuthor'>{blog.title} {blog.author}</p>
        <p>{blog.url}</p>
                likes {blog.likes} <button onClick={() => handleLike(blog)} className='likeButton'>like</button>
        <p>{blog.user.username}</p>
        <button onClick={() => setShowDetails(!showDetails)}>hide</button>
        <button onClick={() => handleDelete(blog)} style={removeVisibility} className='remove-button'>remove</button>
      </div>
      <div style={hideWhenVisible} className='small'>
        {blog.title} {blog.author}
        <button onClick={() => setShowDetails(!showDetails)} className='showButton'>show</button>
      </div>
    </div>
  )



}

Blog.propTypes = {
  handleLike: PropTypes.func.isRequired,
  handleDelete: PropTypes.func.isRequired
}

export default Blog