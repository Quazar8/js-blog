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
    res.send(successResponse({}, 'change profile endpoint'))
}

module.exports = {
    getUserProfile,
    changeProfilePicture
}