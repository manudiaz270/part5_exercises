import { useState } from "react"
const BlogPost = ({createBlog}) => {
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
                title<input type='text' value={title} onChange={({ target }) => setTitle(target.value)}/><br/>
                author<input type='text' value={author} onChange={({ target }) => setAuthor(target.value)}/><br/>
                url<input type='text' value={url} onChange={({ target }) => setUrl(target.value)}/><br/>
                <button type='submit'>create</button>
            </form>
        </div>
    )
}
export default BlogPost