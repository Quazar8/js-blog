const { writeDb, getDb } = require('./db')
const { errorResponse, successResponse } = require('./utils')

const postReply = (req, res) => {
    res.send(successResponse({}, 'Post reply endpoint'))
}

module.exports = {
    postReply
}