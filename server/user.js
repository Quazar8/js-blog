const getUserProfile = (req, res) => {
    const user = require('./db.json').Users[req.params.userId]
    if (!user) {
        res.status(400).send({ error: true, errorMsg: 'No such user exists!'})
        return 
    }

    const userToSend = {
        username: req.params.userId,
        profilePic: user.profilePic,
        totalPosts: user.posts.length,
        posts: user.posts.slice(0, 10)
    }

    res.status(200).send({ 
        error: false,
        user: userToSend
     })
}

module.exports = {
    getUserProfile
}