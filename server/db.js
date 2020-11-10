const fs = require('fs')
const dbURL = './db.json'

const dbScheme = {
    Users: {},
    Posts: {},
}

const db = (callback) => {
    try {
        fs.statSync(dbURL)
        return callback({ msg: 'DB is online' })

    } catch (err) {
        if(err.code === "ENOENT"){
            let scheme = JSON.stringify(dbScheme)
            fs.writeFileSync(dbURL, scheme)
            return callback({msg: 'DB created'})
        }
    }
}

module.exports = {
    db
}
