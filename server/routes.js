const { isLoggedMiddle, uploadMiddleware } = require('./middlewares')
const registerUser = require('./register')
const { loginUser, logoutUser, getLoggedUser } = require('./login')
const { postArticle, getPosts,
        getSinglePost, deletePost,
        editPost, getUserPosts } = require('./posts')
const { getUserProfile } = require('./user')
const { postComment } = require('./comments')

const routes = (app) => {
   app.post('/user/register', registerUser)

   app.post('/user/login', loginUser)

   app.get('/user/logout', logoutUser)

   app.get('/user/logged', getLoggedUser)

   app.get('/user/profile/:userId', getUserProfile)

   app.post('/publish', isLoggedMiddle, uploadMiddleware, postArticle)

   app.get('/posts', getPosts)

   app.get('/post/:postId', getSinglePost)

   app.delete('/post/delete/:postId', isLoggedMiddle, deletePost)

   app.put('/post/edit/:postId', isLoggedMiddle, editPost)

   app.get('/user/:userId/posts/:page', getUserPosts)

   app.post('/post/:postId/comment', isLoggedMiddle, postComment)
}

module.exports = routes