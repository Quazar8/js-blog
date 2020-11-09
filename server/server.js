const express = require('express')
const port = 8000

const app = express()

app.get('/', (req, res) => {
    res.send('Hello from Express!')
})

app.listen(port, () => {
    console.log(`Express server listening on ${port}`)
})