const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy

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
            return res.send({ error: true, 
                errorMsg: 'Username or Password incorrect' })
        return res.status(200).send({error: false, user})
    })(req, res, next)
}

module.exports = loginUser