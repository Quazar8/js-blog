const { writeDb, getDb } = require('./db')
const { errorResponse, successResponse } = require('./utils')

const postReply = (req, res) => {
    res.send(successResponse({}, 'Post reply endpoint'))
}

const getReplies = (req, res) => {
    res.send(successResponse({}, 'Get replies endpoint'))
}

module.exports = {
    postReply,
    getReplies
}