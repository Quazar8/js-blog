const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy

const configurePassport = () => {
    passport.serializeUser((user, done) => {
        done(null, user)
        console.log('serialized user: ', user)
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
        })
    )
}

module.exports = configurePassport