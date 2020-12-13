const { writeDb } = require('./db')

const registerUserDb = async ({ username, password }) => {
    const jsonDb = require('./db.json')
    if (jsonDb.Users[username]) {
        return { error: true, errorMsg: 'User already exists!'}
    }

    const user = {
        password,
        posts: [],
        profilePic: ''
    }
    jsonDb.Users[username] = user

    const str = JSON.stringify(jsonDb)
    let result = await writeDb(str)
    return result
} 

const registerUser = async (req, res) => {
    console.log('register', req.body)
    const data = req.body
    if (!data && !data.username && !data.password){
        res.status(403).send({ error: true, 
            errorMsg: 'User fields missing' })
        return;
    }
        
    let result = await registerUserDb(data)
    if (result.error) {
        res.status(403).send(
            {error: true, errorMsg: result.errorMsg
        })
        return
    } 

    req.login(data.username, err => {
        if (err) {
            return res.status(500).send({ error: true, 
                            errorMsg: 'Something went wrong on logging you in'})
        }
        
        return res.status(200).send({error: false,
            username: data.username,
            msg: 'User registered'
        })
    })
}

module.exports = registerUser