const { json } = require('express')
const fs = require('fs')
const { writeDb } = require('./db')

const registerUser = async ({ username, password}) => {
    const jsonDb = require('./db.json')
    if(jsonDb.Users[username]) 
        return { error: true, errorMsg: 'User already exists!'}

    jsonDb.Users[username] =  { password }

    const str = JSON.stringify(jsonDb)
    let result = await writeDb(str)
    return result
} 

const routes = (app) => {
    app.get('/', (req, res) => {
        res.send('Hello from Express!')
    }) 

    app.post('/user/register',async (req, res) => {
        console.log(req.body)
        const data = req.body
        if(!data && !data.username && !data.password){
            res.status(500).send({ error: true, 
                errorMsg: 'User fields missing' })
            return;
        }
           
        let result = await registerUser(data)
        if(result.error)
            res.status(500).send({error: true, 
                        errorMsg: result.errorMsg})
        else 
            res.status(200).send({error: false,
                 msg: "User registered"})
    })
}

module.exports = routes