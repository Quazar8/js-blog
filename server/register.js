const { writeDb } = require('./db')
const { successResponse, errorResonse } = require('./utils')

const registerUserDb = async ({ username, password }) => {
    const jsonDb = require('./db.json')
    if (jsonDb.Users[username]) {
        return { error: true, errorMsg: 'User already exists!'}
    }

    const user = {
        password,
        posts: [],
        profilePic: '/server/images/user_default.png'
    }
    jsonDb.Users[username] = user

    const str = JSON.stringify(jsonDb)
    let result = await writeDb(str)
    return result
} 

const registerUser = async (req, res) => {
    console.log('register', req.body)
    const data = req.body
    console.log('username', data.username)
    if (!data || !data.username || !data.password){
        res.status(400).send(errorResonse({}, 'User fields missing'))
        return;
    }

    data.username = data.username.trim()
    data.password = data.password.trim()
    let result = await registerUserDb(data)
    if (result.error) {
        res.status(400).send(errorResonse({}, result.errorMsg))
        return
    } 

    req.login(data.username, err => {
        if (err) {
            console.error('Login after register error', err)
            return res.status(500).send(errorResonse({}, 'Something went wrong when logging you in'))
        }
        
        const { profilePic } = require('./db.json').Users[data.username]
        const userInfo = {
            username: data.username,
            profilePic
        }   

        return res.status(200).send(successResponse({
            user: userInfo
        }, 'You have registered'))     
    })
}

module.exports = registerUser