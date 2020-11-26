const crypto = require('crypto')

const genId = ( numberOfBytes ) => {
    return crypto.randomBytes(numberOfBytes).toString('hex')
}

module.exports = {
    genId
}