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
        upvotedBy: {},
        downvotedBy: {},
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
    const { parentId } = req.params
    if (!parentId) {
        res.status(400).send(errorResponse({}, 'No post id provided'))
        return
    }

    const db = getDb()
    const post = db.Posts[parentId]
    const parentComment = db.Comments[parentId]

    if (!post && !parentComment) {
        res.status(400).send(errorResponse({}, 'Post doesn\'t exist'))
        return
    }

    const serverComments = db.Comments
    const comments = []

    let commentsContainer
    if (post) {
        commentsContainer = post.comments
    } else {
        commentsContainer = parentComment.replies
    }

    const Users = db.Users
    for (let id of commentsContainer) {
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

    const db = getDb()
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
    const parentComment = Comments[comment.parentPost]

    let commentsContainer
    if (post) {
        commentsContainer = post.comments
    } else {
        commentsContainer = parentComment.replies
    }

    for (let i = 0; i < commentsContainer.length; i++) {
        if (commentsContainer[i] === commentId) {
            commentsContainer.splice(i, 1)
            break
        }
    }

    const deleteRepliesRec = (repliesIdArr) => {
        for (let id of repliesIdArr) {
            let currentComment = Comments[id]
            deleteRepliesRec(currentComment.replies)
            delete Comments[id]
        }
    }

    deleteRepliesRec(comment.replies)

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

const upvoteComment = (req, res) => {
    const { commentId } = req.params
    if (!commentId) {
        res.status(400).send(errorResponse({}, 'No comment id provided'))
        return
    }

    const db = getDb()
    const comment = db.Comments[commentId]
    if (!comment) {
        res.status(400).send(errorResponse({}, 'Comment doesn\'t exist'))
        return
    }

    comment.upvotedBy[req.user] = null

    writeDb(JSON.stringify(db)).then(result => {
        if (result.error) {
            res.status(500).send(errorResponse({}, 'Something went wrong'))
            return
        }

        res.status(200).send(successResponse({}, 'Comment upvoted'))
    })
}

const downvoteComment = (req, res) => {
    const commentId = req.params.commentId
    if (!commentId) {
        res.status(400).send(errorResponse({}, 'Missing comment id'))
        return
    }

    const db = getDb()
    const comment = db.Comments[commentId]

    if (!comment) {
        res.status(400).send(errorResponse({}, 'Comment doesn\'t exist'))
        return
    }

    res.send('OK')
}

module.exports = {
    postComment,
    getPostComments,
    deleteComment,
    editComment,
    upvoteComment,
    downvoteComment
}