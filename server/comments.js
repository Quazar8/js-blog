const { successResponse, errorResponse,
        getDate, genId } = require('./utils')
const { writeDb, getDb } = require('./db')

const postComment = (req, res) => {
    const { parentId } = req.params
    if (!parentId) {
        res.status(400).send(errorResponse({}, 'Missing post id'))
        return
    }

    const content  = req.body.content.trim()
    if (!content) {
        res.status(400).send(errorResponse({}, 'Empty comment'))
        return
    }

    const db = getDb()
    const post = db.Posts[parentId]
    const parentComment = db.Comments[parentId]
    if (!post && !parentComment) {
        res.status(400).send(errorResponse({ parentId }, 'Invalid post id'))
        return
    }

    const commentId = `${parentId}_${genId(8)}`
    const comment = {
        commentId,
        content,
        authorId: req.user,
        parentPost: parentId,
        date: getDate(),
        upvotedBy: [],
        replies: []
    }

    if (post) {
        post.comments.push(commentId)
    } else if (parentComment) {
        parentComment.replies.push(commentId)
    }

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

    res.status(500).send(errorResponse({}, 'Delete comment temporary disabled'))
    return

    const post = Posts[comment.parentPost]
    for (let i = 0; i < post.comments.length; i++) {
        if (post.comments[i] === commentId) {
            post.comments.splice(i, 1)
            break
        }
    }

    delete Comments[commentId]

    writeDb(JSON.stringify(db)).then((err) => {
        if (err.error) {
            res.status(500).send(errorResponse({}, 'Error deleting the comment'))
            return
        }

        res.status(200).send(successResponse({}, 'Comment deleted'))
    })
}

const editComment = (req, res) => {
    const { commentId } = req.params
    if (!commentId) {
        res.status(400).send(errorResponse({}, 'Missing comment id'))
        return
    }

    const content = req.body.content.trim()

    if (!content) {
        res.status(400).send(errorResponse({}, 'Missing comment body'))
        return
    }

    const db = require('./db.json')
    const comment = db.Comments[commentId]

    if (content === comment.content) {
        res.status(400).send(errorResponse({}, 'Edited content is the same as the old one'))
        return
    } 

    if (req.user !== comment.authorId) {
        res.status(403).send(errorResponse({}, 'Unauthorized to do that'))
        return
    }

    comment.content = content
    writeDb(JSON.stringify(db)).then(err => {
        if (err.error) {
            res.status(500).send(errorResponse({}, 'Couldn\'t edit the comment'))
            return
        } 

        res.status(200).send(successResponse({}, 'Comment edited'))
    })
}

module.exports = {
    postComment,
    getPostComments,
    deleteComment,
    editComment
}