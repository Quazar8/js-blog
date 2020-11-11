const loginUser = (req, res) => {
       console.log('login', req.body)
       res.status(200).send({error: false}) 
}

module.exports = loginUser