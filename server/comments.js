const { successResponse, errorResponse } = require('./utils')
const postComment = (req, res) => {
    res.status(200).send(successResponse({}, 'Comment route under construction'))
}

module.exports = {
    postComment
}