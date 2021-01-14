const { isLoggedMiddle, uploadMiddleware } = require('./middlewares')
const registerUser = require('./register')
const { loginUser, logoutUser, getLoggedUser } = require('./login')
const { postArticle, getPosts,
        getSinglePost, deletePost } = require('./posts')
const { getUserProfile } = require('./user')

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
}

module.exports = routes