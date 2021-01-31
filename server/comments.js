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
        postId,
        authorId: req.user,
        date: getDate(),
        upvotedBy: []
    }

    post.comments.push(commentId)
    db.Comments[commentId] = comment
    
    writeDb(JSON.stringify(db)).then((result) => {
        if (result.error) {
            return
        }

        res.status(200).send(successResponse({}, 'Successfully commented'))
    })

}

module.exports = {
    postComment
}