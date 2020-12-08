const fs = require('fs')
const dbURL = './server/db.json'

const dbScheme = {
    Users: {},
    Posts: {},
}

const initializeDb = (callback) => {
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

const writeDb = async (data) => {
    try {
        await fs.writeFile(dbURL, data, () => {})
        return { error: false }
    } catch(err) {
        console.error(err)
        return { error: true, errorMsg: "Problem with server" }
    }
    
}

module.exports = {
    initializeDb,
    writeDb
}
