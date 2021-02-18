const fs = require('fs')
const genDummyDb = require('./dummyDb')
const dbURL = './server/db.json'

const initializeDb = (callback) => {
    try {
        fs.statSync(dbURL)
        return callback({ msg: 'DB is online' })

    } catch (err) {
        if(err.code === "ENOENT"){
            let dummyDB = JSON.stringify(genDummyDb())
            fs.writeFileSync(dbURL, dummyDB)
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

const getDb = () => {
    const db = require('./db.json')
    if (!db.Users) {
        db.Users = {}
    }

    if (!db.Posts) {
        db.Posts = {}
    }

    if (!db.Comments) {
        db.Comments = {}
    }

    if (!db.Replies) {
        db.Replies = {}
    }

    return db
}


module.exports = {
    initializeDb,
    writeDb,
    getDb
}
