const { isLoggedMiddle, uploadMiddleware } = require('./middlewares')
const registerUser = require('./register')
const { loginUser, logoutUser, getLoggedUser } = require('./login')
const { postArticle, getPosts,
        getSinglePost, deletePost,
        editPost, getUserPosts, changePostStar } = require('./posts')
const { getUserProfile, changeProfilePicture } = require('./user')
const { postComment, getPostComments,
        deleteComment, editComment } = require('./comments')

const routes = (app) => {
   app.post('/user/register', registerUser)

   app.post('/user/login', loginUser)

   app.get('/user/logout', logoutUser)

   app.get('/user/logged', getLoggedUser)

   app.get('/user/profile/:userId', getUserProfile)

   app.post('/user/profile/:userId/picture/change',
      isLoggedMiddle, changeProfilePicture)

   app.post('/publish', isLoggedMiddle, uploadMiddleware('thumbnail'), postArticle)

   app.get('/posts', getPosts)

   app.get('/post/:postId', getSinglePost)

   app.delete('/post/delete/:postId', isLoggedMiddle, deletePost)

   app.put('/post/edit/:postId', isLoggedMiddle, editPost)

   app.get('/user/:userId/posts/:page', getUserPosts)

   app.post('/post/:parentId/comment', isLoggedMiddle, postComment)

   app.put('/post/:postId/stars/change', isLoggedMiddle, changePostStar)

   app.get('/post/:parentId/comments', getPostComments)

   app.delete('/comment/:commentId/delete', isLoggedMiddle, deleteComment)

   app.put('/comment/:commentId/edit', isLoggedMiddle, editComment)
}

module.exports = routes