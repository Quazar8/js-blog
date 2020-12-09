const multer = require('multer')

const IsLoggedMiddle = (req, res, next) => {
    if (req.user) {
        next()
    } else {
        res.status(403).send({ error: true
            , errorMsg: 'User not logged in!'})
    }
}

const uploadMiddleware = () => {
    const storage = multer.diskStorage({
        destination: './static/uploads/'
    })
    const upload = multer({
            storage
    })

    return upload
}

module.exports = {
    IsLoggedMiddle,
    uploadMiddleware
}