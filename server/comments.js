const { successResponse, errorResponse,
        getDate, genId } = require('./utils')

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

    const comment = {
        commentId: `${postId}_${genId(8)}`,
        content,
        postId,
        authorId: req.user,
        date: getDate(),
        upvotedBy: []
    }

    res.status(200).send(successResponse({ comment }, 'Comment route under construction'))
}

module.exports = {
    postComment
}