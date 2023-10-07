import blogService from '../../src/services/blogs'
describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {
      username: 'abcdefg', name:'abcdefg', password:'abcdefg'
    }
    cy.request('POST', 'http://localhost:3003/api/users', user)
    cy.visit('http://localhost:5173')
  })
  it('Login form is shown', function() {
    cy.contains('Log in to application')
  })

  describe('Login', function() {
    it('succeds with correct credentials', function() {
      cy.get('input:first').type('abcdefg')
      cy.get('input:last').type('abcdefg')
      cy.get('.login-button').click()
      cy.contains('abcdefg logged in')
    })
    it('fails with wrong credentials', function() {
      cy.get('input:first').type('abcdefg')
      cy.get('input:last').type('wrong')
      cy.get('.login-button').click()
      cy.contains('wrong username or password')
    })
  })

  describe('When logged in', function() {
    beforeEach(function() {
      cy.request('POST', 'http://localhost:3003/api/login', {
        username: 'abcdefg', password:'abcdefg'
      }).then(response => {
        localStorage.setItem('loggedBlogappUser', JSON.stringify(response.body))
        blogService.setToken(response.body.token)
        cy.visit('http://localhost:5173')
      })
    })
    it('A blog can be created', function() {
      cy.contains('create new blog').click()
      cy.get('.title').type('a')
      cy.get('.author').type('b')
      cy.get('.url').type('c')
      cy.contains('create').click({ force: true })
      cy.contains('a')
    })
    it('A blog post can be liked', function() {
      cy.contains('create new blog').click()
      cy.get('.title').type('a')
      cy.get('.author').type('b')
      cy.get('.url').type('c')
      cy.get('.create-button').click({ force:true })
      cy.contains('show').click()
      cy.contains('like').click()
    })
    it('The user who created a blog post can delete it', function() {
      cy.contains('create new blog').click()
      cy.get('.title').type('a')
      cy.get('.author').type('b')
      cy.get('.url').type('c')
      cy.get('.create-button').click({ force:true })
      cy.contains('show').click()
      cy.contains('remove').click()
    })
  })
  describe('When a blog post already exists', function() {
    beforeEach(function() {
      cy.request('POST', 'http://localhost:3003/api/users', { username: 'username', password: 'password', name: 'name' })
      cy.request('POST', 'http://localhost:3003/api/login', {
        username: 'username', password:'password'
      }).then(response => {
        localStorage.setItem('loggedBlogappUser', JSON.stringify(response.body))
        blogService.setToken(response.body.token)
        cy.visit('http://localhost:5173')
      })
      cy.contains('create new blog').click()
      cy.get('.title').type('a')
      cy.get('.author').type('b')
      cy.get('.url').type('c')
      cy.get('.create-button').click({ force:true })
      cy.contains('logout').click()
      cy.request('POST', 'http://localhost:3003/api/login', {
        username: 'abcdefg', password:'abcdefg'
      }).then(response => {
        localStorage.setItem('loggedBlogappUser', JSON.stringify(response.body))
        blogService.setToken(response.body.token)
        cy.visit('http://localhost:5173')
      })
    })
    it('remove button is not visible to users other than the creator of the blog', function() {
      cy.contains('show').click()
      cy.get('.remove-button').should('have.css', 'display', 'none')
    })



  })})