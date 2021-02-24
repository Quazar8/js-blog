const fs = require('fs')
const path = require('path')
const { writeDb, getDb} = require('./db')
const uploadImage = require('./upload')
const { successResponse, errorResponse } = require('./utils')

const getUserProfile = (req, res) => {
    const user = require('./db.json').Users[req.params.userId]
    if (!user) {
        res.status(400).send({ error: true, errorMsg: 'No such user exists!'})
        return 
    }

    const retrievePosts = (ids) => {
        const posts = require('./db.json').Posts
        const result = []

        for (let postId of ids) {
            if (posts[postId]) {
                result.push(posts[postId])
            }
        }

        return result
    }
    const userPosts = retrievePosts(user.posts.slice(0, 10))
    const userToSend = {
        username: req.params.userId,
        profilePic: user.profilePic,
        totalPosts: user.posts.length,
        posts: userPosts
    }

    res.status(200).send({ 
        error: false,
        user: userToSend
     })
}

const changeProfilePicture = (req, res) => {
    const userId = req.params.userId
    if (!userId) {
        res.status(400).send(errorResponse({}, 'Missing target username'))
        return
    }

    const db = getDb()
    const user = db.Users[userId]

    if (!user) {
        res.status(400).send(errorResponse({}, 'No such user exists'))
        return
    }

    if (req.user !== userId) {
        res.status(403).send(errorResponse({}, 'Don\'t have the right to do that'))
        return
    }

    const tryRecordChanges = (req, res) => {
        if (!req.file) {
            res.status(400).send(errorResponse({}, 'Missing image file'))
            return
        }

        if(user.profilePic !== '/server/images/user_default.png') {
            fs.unlink(path.join('./' + user.profilePic), (err) => {
                if (err) {
                    console.error('Old profile pic failed to delete')
                } else {
                    console.log('Old profile pic deleted')
                }
            })
         }

        user.profilePic = '\\' + req.file.path
        writeDb(JSON.stringify(db)).then(resp => {
            if (resp.error) {
                res.status(500).send(errorResponse({}, resp.errorMsg))
                return
            }

            res.status(200).send(successResponse({}, 'Profile picture changed'))
        })
    }

    uploadImage.single('profilePic')(req, res, (err) => {
        if (err) {
            console.error('Error uploading profile picture')
            res.status(500).send(errorResponse({}, 'Could not upload the profile picture'))
            return
        }

        tryRecordChanges(req, res)
    })

}

module.exports = {
    getUserProfile,
    changeProfilePicture
}