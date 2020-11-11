const registerUser = require('./register')

const routes = (app) => {
    app.get('/', (req, res) => {
        res.send('Hello from Express!')
    }) 
   
   app.post('/user/register', registerUser)

   app.post('/user/login', (req, res) => {
       console.log('login', req.body)
       res.status(200).send({error: false})
   })
}

module.exports = routes