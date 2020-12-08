const express = require('express')
const cors = require('cors')
const passport = require('passport')
const expressSession = require('express-session')

const configurePassport = require('./passport.config')
const { initializeDb } =  require('./db')
const routes = require('./routes')
const port = 8000

const app = express()

initializeDb(({ msg }) => {
    console.log(msg)
})

const corsOptions = {
    origin: 'http://localhost:3000',
    credentials: true
}

const expressSessionOptions = { 
    secret: 'secret',
    saveUninitialized: false,
    resave: false
}

//middlewares
app.use(cors(corsOptions))
app.use(express.json())
app.use(express.urlencoded({
    extended: true
}))
app.use(expressSession(expressSessionOptions))

configurePassport()
app.use(passport.initialize())
app.use(passport.session())

routes(app)

app.listen(port, () => {
    console.log(`Express server listening on ${port}`)
})