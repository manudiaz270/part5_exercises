const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')

const initialBlogs = [
{
    title: "a",
    author: "a",
    url: "a",
    likes: 1
},
{
    title:"b",
    author:"b",
    url:"b",
    likes:2
},
{
    title:"c",
    url:"c",
    author:"c",
    likes:3
}
]

beforeEach(async () => {
    await Blog.deleteMany({})
    let blogObject = new Blog(initialBlogs[0])
    await blogObject.save()
    blogObject = new Blog(initialBlogs[1])
    await blogObject.save()
    blogObject = new Blog(initialBlogs[2])
    await blogObject.save()
}, 100000)

test('blogs are returned as json', async () => {
    const response = await api.get('/api/blogs').expect('Content-Type', /application\/json/)
    expect(response.body).toHaveLength(3)
})

test('identifier is written as id', async () => {
    const response = await api.get('/api/blogs')
    response.body.forEach((blog) => expect(blog.id).toBeDefined())
}, 100000)

test('post request creates new blog post', async () => {
    const newBlog = {
        title:"d",
        url:"d",
        author:"d",
        likes:4
    }
    await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(201)
    const response = await api.get('/api/blogs')
    console.log(response.body);
    expect(response.body).toHaveLength(initialBlogs.length + 1)
})

test('like count will default to 0', async () => {
    const newBlog = {
        title:"e",
        url:"e",
        author:"e"
    }
    const response = await api.post('/api/blogs').send(newBlog)
    expect(response.body.likes).toEqual(0)

})

test('delete request functions as expected', async () => {
    let blogs = await Blog.find({})
    blogs = blogs.map(blog => blog.toJSON())
    await api
        .delete(`/api/blogs/${blogs[0].id}`)
    const response = await api.get('/api/blogs')
    expect(response.body).toHaveLength(initialBlogs.length - 1)
})

test('put request updates blog', async () => {
    const updatedBlog = {
        title: "b",
        author: "a",
        url: "a",
        likes: 1
    }
    let blogs = await Blog.find({})
    blogs = blogs.map(blog => blog.toJSON())
    await api
        .put(`/api/blogs/${blogs[0].id}`)
        .send(updatedBlog)
        .expect(204)

})

afterAll(async () => {
    await mongoose.connection.close()
})