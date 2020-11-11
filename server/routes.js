const registerUser = require('./register')
const loginUser = require('./login')

const routes = (app) => {
    app.get('/', (req, res) => {
        res.send('Hello from Express!')
    }) 
   
   app.post('/user/register', registerUser)

   app.post('/user/login', loginUser)
}

module.exports = routes