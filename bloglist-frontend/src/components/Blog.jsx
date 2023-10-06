import { useState } from "react"
const Blog = ({ blog, handleLike, handleDelete }) => {
    const [showDetails, setShowDetails] = useState(false)

    const blogStyle = {
        paddingTop: 10,
        paddingLeft: 2,
        border: 'solid',
        borderWidth: 1,
        marginBottom: 5
    }

    if(showDetails){
        return(
            <div style={blogStyle}>
                <p>{blog.title} {blog.author}</p>
                <p>{blog.url}</p>
                likes {blog.likes} <button onClick={() => handleLike(blog)}>like</button>
                <p>{blog.user.username}</p>
                <button onClick={() => setShowDetails(!showDetails)}>hide</button>
                <button onClick={() => handleDelete(blog)}>remove</button>
            </div>
        )
    }

    return (
        <div>
            {blog.title} {blog.author}
            <button onClick={() => setShowDetails(!showDetails)}>show</button>
        </div>  
    )
}

export default Blog