const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy

passport.serializeUser((user, done) => {
    done(null, user)
})

passport.deserializeUser((user, done) => {
    done(null, user)
})

passport.use(new LocalStrategy((username, password, done) => {
    const db = require('./db.json')
    const users = db.Users

    if(!users[username]) 
        return done(null, false, 
            { message: "User doesn't exist"})
    
    if(users[username].password !== password)
        return done(null, false, {message: 'Incorrect password'})

    return done(null, username)
}))

const loginUser = (req, res, next) => {
    passport.authenticate('local', (err, user, info) => {
        if(err) return next(err)
        if(!user) 
            return res.status(403).send({ error: true, 
                errorMsg: 'Username or Password incorrect' })

        req.login(user, (err) => {
            if(err) return next(err)
            return res.status(200).send({error: false, username: user})
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

module.exports = {
    loginUser,
    logoutUser
}