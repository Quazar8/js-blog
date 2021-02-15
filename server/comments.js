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
        parentPost: postId,
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
    const { commentId } = req.params
    if (!commentId) {
        res.status(400).send(errorResponse({}, 'Missing comment id'))
        return
    }

    const db = require('./db.json')
    const { Comments, Posts } = db
    const comment = Comments[commentId]

    if (!comment) {
        res.status(400).send(errorResponse({}, 'Incorrect comment id'))
        return
    }

    if (req.user !== comment.authorId) {
        res.status(403).send(errorResponse({}, 'No permission to do that'))
        return
    }

    const post = Posts[comment.parentPost]
    for (let i = 0; i < post.comments; i++) {
        if (post.comments[i] === commentId) {
            post.comments = post.comments.splice(i, 1)
            break
        }
    }

    console.log(post.comments)

    // delete Comments[commentId]

    // writeDb(JSON.stringify(db)).then((err) => {
    //     if (err.error) {
    //         res.status(500).send(errorResponse({}, 'Error deleting the comment'))
    //         return
    //     }

    //     res.status(200).send(successResponse({}, 'Comment deleted'))
    // })
    res.send(successResponse({}, ''))
}

const editComment = (req, res) => {
    res.status(200).send(successResponse({}, 'Edit comment endpoint'))
}

module.exports = {
    postComment,
    getPostComments,
    deleteComment,
    editComment
}