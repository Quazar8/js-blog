const multer = require('multer')
const path = require('path')

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
        destination: './static/uploads/',
        filename: (req, file, cb) => {
            const name = Date.now() + 
                         path.extname(file.originalname)
            cb(null, name)
        }
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