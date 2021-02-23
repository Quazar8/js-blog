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

    if (req.user !== userId) {
        res.status(403).send(errorResponse({}, 'Don\'t have the right to do that'))
        return
    }

    const tryRecordChanges = (req, res) => {
        if (!req.file) {
            res.status(400).send(errorResponse({}, 'Missing image file'))
            return
        }

        res.status(200).send(successResponse({}, 'Change profile pic endpoint'))
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