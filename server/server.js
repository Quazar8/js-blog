const express = require('express')
const cors = require('cors')
const passport = require('passport')
const { db } =  require('./db')
const routes = require('./routes')
const port = 8000

const app = express()

const corsOptions = {
    origin: 'http://localhost:3000'
}

db(({ msg }) => {
    console.log(msg)
})

app.use(cors(corsOptions))
app.use(express.json())
app.use(express.urlencoded({
    extended: true
}))
app.use(passport.initialize())

routes(app)

app.listen(port, () => {
    console.log(`Express server listening on ${port}`)
})