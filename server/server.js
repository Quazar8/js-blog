const express = require('express')
const { db } =  require('./db')
const port = 8000

const app = express()
app.get('/', (req, res) => {
    res.send('Hello from Express!')
})

db(({ msg }) => {
    console.log(msg)
})

app.listen(port, () => {
    console.log(`Express server listening on ${port}`)
})