const passport = require('passport')
const { successResponse, errorResponse } = require('./utils')

const loginUser = (req, res, next) => {
    passport.authenticate('local', (err, user, info) => {
        if(err) return next(err)
        if(!user) 
            return res.status(403).send(errorResponse({}, 'Username or password are incorrect'))

        req.login(user, (err) => {
            if(err) return next(err)

            const { Users } = require('./db.json')
            const { profilePic } = Users[user]

            const userInfo = {
                username: user,
                profilePic
            }
            return res.status(200)
                      .send(successResponse({ user: userInfo }, ''))
        })
        
    })(req, res, next)
}

const logoutUser = (req, res) => {
    req.logout()
    res.status(200)
    .clearCookie('connect.sid')
    .send(successResponse('Logged out successfully'))
}

const getLoggedUser = (req, res) => {
    if (!req.user) {
        res.status(200).send(successResponse({ isLogged: false }, ''))
        return
    }
    
    const { profilePic } = require('./db.json').Users[req.user]
    
    res.status(200).send(successResponse({
        isLogged: true,
        user: {
            username: req.user,
            profilePic
        }
    }, ''))
}

module.exports = {
    loginUser,
    logoutUser, 
    getLoggedUser
}