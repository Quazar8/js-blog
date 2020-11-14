const { writeDb } = require('./db')

const registerUserDb = async ({ username, password}) => {
    const jsonDb = require('./db.json')
    if(jsonDb.Users[username]) 
        return { error: true, errorMsg: 'User already exists!'}

    jsonDb.Users[username] =  { password }

    const str = JSON.stringify(jsonDb)
    let result = await writeDb(str)
    return result
} 

const registerUser = async (req, res) => {
    console.log('register', req.body)
    const data = req.body
    if(!data && !data.username && !data.password){
        res.status(500).send({ error: true, 
            errorMsg: 'User fields missing' })
        return;
    }
        
    let result = await registerUserDb(data)
    if(result.error)
        res.status(500).send({error: true, 
                    errorMsg: result.errorMsg})
    else 
        res.status(200).send({error: false,
                username: data.username,
                msg: "User registered"})
}

module.exports = registerUser