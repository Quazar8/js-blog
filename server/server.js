const express = require('express')
const { db } =  require('./db')
const routes = require('./routes')
const port = 8000

const app = express()

db(({ msg }) => {
    console.log(msg)
})

app.use(express.json())
app.use(express.urlencoded())
routes(app)

app.listen(port, () => {
    console.log(`Express server listening on ${port}`)
})