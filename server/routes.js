const registerUser = require('./register')
const loginUser = require('./login')
const logoutUser = require('./logout')
const { postArticle } = require('./posts')

const routes = (app) => {
    app.get('/', (req, res) => {
        res.send('Hello from Express!')
    }) 
   
   app.post('/user/register', registerUser)

   app.post('/user/login', loginUser)

   app.get('/user/logout', logoutUser)

   app.post('/publish', postArticle)
}

module.exports = routes