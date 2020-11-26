const crypto = require('crypto')

const genId = ( numberOfBytes ) => {
    return crypto.randomBytes(numberOfBytes).toString('hex')
}

const getDate = () => {
    const date = new Date()

    const day =  date.getDate()
    const month = date.getMonth()
    const year = date.getFullYear()
    const hours = date.getHours()
    const minutes = date.getMinutes()
    const seconds = date.getSeconds()
    const timezone = date.getTimezoneOffset()

    return `${timezone} ${hours}:${minutes}:${seconds} ${day}-${month}-${year}`
}

module.exports = {
    genId,
    getDate
}