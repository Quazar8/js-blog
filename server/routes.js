const routes = (app) => {
    app.get('/', (req, res) => {
        res.send('Hello from Express!')
    }) 

    app.post('/user/register', (req, res) => {
        console.log(req.body)
        res.status(200).send({msg: 'OK'})
    })
}

module.exports = routes