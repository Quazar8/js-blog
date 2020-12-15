const passport = require('passport')

const loginUser = (req, res, next) => {
    passport.authenticate('local', (err, user, info) => {
        if(err) return next(err)
        if(!user) 
            return res.status(403).send({ error: true, 
                errorMsg: 'Username or Password incorrect' })

        req.login(user, (err) => {
            if(err) return next(err)

            const { Users } = require('./db.json')
            const { profilePic } = Users[user]
            return res.status(200).send({error: false, user: {
                username: user,
                profilePic
            }})
        })
        
    })(req, res, next)
}

const logoutUser = (req, res) => {
    req.logout()
    res.status(200)
    .clearCookie('connect.sid')
    .send({ error: false, 
                    msg: 'User logged out'})
}

const getLoggedUser = (req, res) => {
    if (!req.user) {
        res.status(200).send({ error: false, 
            isLogged: false})
        return
    }
    
    const { profilePic } = require('./db.json').Users[req.user]
    res.status(200).send({ error: false,
         isLogged: true,
         user: {
            username: req.user,
            profilePic
         }
    })
}

module.exports = {
    loginUser,
    logoutUser, 
    getLoggedUser
}