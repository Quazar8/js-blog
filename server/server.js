const express = require('express')
const cors = require('cors')
const passport = require('passport')
const expressSession = require('express-session')

const { db } =  require('./db')
const routes = require('./routes')
const port = 8000

const app = express()

const corsOptions = {
    origin: 'http://localhost:3000',
    credentials: true
}

db(({ msg }) => {
    console.log(msg)
})

//middlewares
app.use(cors(corsOptions))
app.use(express.json())
app.use(express.urlencoded({
    extended: true
}))
app.use(expressSession({ secret: 'secret',
                         saveUninitialized: false,
                         resave: false }))
app.use(passport.initialize())
app.use(passport.session())

routes(app)

app.listen(port, () => {
    console.log(`Express server listening on ${port}`)
})