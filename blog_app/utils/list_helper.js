const dummy = (blogs) => {
    return 1
}



const totalLikes = (blogs) => {
    like_sum = blogs.reduce((accumulator, blog) => {
        return accumulator + blog.likes
    }, 0)
    return like_sum
}

const favouriteBlog = (blogs) => {
    let most_liked = 0
    for(let i = 0; i < blogs.length; i++){
        if(blogs[i].likes >= blogs[most_liked].likes){
            most_liked = i
        }
    }
    return [blogs[most_liked]]
}

const mostBlogs = (blogs) => {
    let author_object = {}
    let author = ''
    for(let i = 0; i < blogs.length; i++){
        author = blogs[i].author
        if(!author_object[author]){
            author_object[author] = 1
        }else{author_object[author] += 1}
    }
    console.log(author_object);
    let max_author = ''
    for (const auth in author_object){
        console.log(auth);
        if(author_object[auth] > author_object[max_author] || !max_author){
            max_author = auth
            
        }
    }
    return {author: max_author, blogs: author_object[max_author]} 
}


const mostLikes = (blogs) => {
    let author_object = {}
    let author = ''
    let likes = 0
    for(let i = 0; i < blogs.length; i++){
        author = blogs[i].author
        likes = blogs[i].likes
        if(!author_object[author]){
            author_object[author] = likes
        }else{author_object[author] += likes}
    }
    console.log(author_object);
    let max_author = ''
    for (const auth in author_object){
        console.log(auth);
        if(author_object[auth] > author_object[max_author] || !max_author){
            max_author = auth
            
        }
    }
    return {author: max_author, likes: author_object[max_author]} 
}

module.exports = {
    totalLikes, favouriteBlog, mostBlogs, mostLikes, dummy
  }