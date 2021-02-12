const { successResponse, errorResponse,
        getDate, genId } = require('./utils')
const { writeDb } = require('./db')

const postComment = (req, res) => {
    const { postId } = req.params
    if (!postId) {
        res.status(400).send(errorResponse({}, 'Missing post id'))
    }

    const { content } = req.body
    if (!content) {
        res.status(400).send(errorResponse({}, 'Empty comment'))
    }

    const db = require('./db.json')
    const post = db.Posts[postId]
    if (!post) {
        res.status(400).send(errorResponse({ postId }, 'Invalid post id'))
    }

    const commentId = `${postId}_${genId(8)}`
    const comment = {
        commentId,
        content,
        authorId: req.user,
        date: getDate(),
        upvotedBy: []
    }

    post.comments.push(commentId)
    db.Comments[commentId] = comment
    
    writeDb(JSON.stringify(db)).then((result) => {
        if (result.error) {
            res.status(500).send(errorResponse({}, 'Error on trying to create your comment'))
            return
        }

        res.status(200).send(successResponse({}, 'Successfully commented'))
    })

}

const getPostComments = (req, res) => {
    const postId = req.params.postId
    if (!postId) {
        res.status(400).send(errorResponse({}, 'No post id provided'))
        return
    }

    const post = require('./db.json').Posts[postId]

    if (!post) {
        res.status(400).send(errorResponse({}, 'Post doesn\'t exist'))
        return
    }

    const serverComments = require('./db.json').Comments
    const comments = []

    const Users = require('./db.json').Users
    for (let id of post.comments) {
        const comment = serverComments[id]
        const user = Users[comment.authorId]
        const author = { username: comment.authorId, profilePic: user.profilePic}

        comment.author = author
        comments.push(comment)
    }


    res.status(200).send({ comments })
}

const deleteComment = (req, res) => {
    res.status(200).send(successResponse({}, 'Delete comment endpoint'))
}

module.exports = {
    postComment,
    getPostComments,
    deleteComment
}