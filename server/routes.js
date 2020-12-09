const { IsLoggedMiddle, upload } = require('./middlewares')
const registerUser = require('./register')
const { loginUser, logoutUser, getLoggedUser } = require('./login')
const { postArticle, getPosts, getSinglePost } = require('./posts')

const routes = (app) => {
    app.get('/', (req, res) => {
        res.send('Hello from Express!')
    }) 
   
   app.post('/user/register', registerUser)

   app.post('/user/login', loginUser)

   app.get('/user/logout', logoutUser)

   app.get('/user/logged', getLoggedUser)

   app.post('/publish', upload.single('thumbnail'), postArticle)

   app.get('/posts', getPosts)

   app.get('/post/:postId', getSinglePost)
}

module.exports = routes