const express = require('express')
const cors = require('cors')
const passport = require('passport')
const expressSession = require('express-session')
const webpack = require('webpack')

const webpackConfig = require('../configs/webpack.config')
const configurePassport = require('./passport.config')
const { initializeDb } =  require('./db')
const routes = require('./routes')
const port = 8000

const app = express()

initializeDb(({ msg }) => {
    console.log(msg)
})

webpack(webpackConfig(process.env, { mode: 'production'}),
            (err, stats) => {
    if (err || stats.hasErrors()) {
        console.error(err)
    }

    console.log('webpack compiled without errors')
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
app.use('/server/images', express.static('./server/images'))
app.use('/static', express.static('./static'))
app.use(express.static('static'))
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