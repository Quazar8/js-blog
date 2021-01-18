const crypto = require('crypto')

const genId = ( numberOfBytes ) => {
    return crypto.randomBytes(numberOfBytes).toString('hex')
}

const getDate = () => {
    const date = new Date()

    const day =  date.getDate()
    const month = date.getMonth() + 1
    const year = date.getFullYear()
    const hours = date.getHours()
    const minutes = date.getMinutes()
    const seconds = date.getSeconds()
    const timezone = date.getTimezoneOffset()

    return `${timezone} ${hours}:${minutes}:${seconds} ${day}-${month}-${year}`
}

const getRandom = (lower, upper) => {
    return Math.round(lower + upper * Math.random())
}

const successResponse = (dataObject, msg) => ({
    ...dataObject,
    error: false,
    msg
})

const errorResonse = (dataObject, errorMsg) => ({
    ...dataObject,
    error: true,
    errorMsg
})

module.exports = {
    genId,
    getDate,
    getRandom,
    successResponse,
    errorResonse
}