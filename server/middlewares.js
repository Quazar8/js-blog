const multer = require('multer')
const path = require('path')
const { genId, errorResponse } = require('./utils')

const isLoggedMiddle = (req, res, next) => {
    if (req.user) {
        next()
    } else {
        res.status(403).send({ error: true
            , errorMsg: 'User not logged in!'})
    }
}

const uploadMiddleware = (req, res, next) => {
    const checkFileType = (file, cb) => {
        const permitted = /jpeg|jpg|png/

        const ext = path.extname(file.originalname).toLowerCase()
        const checkExt = permitted.test(ext)
        const checkMime = permitted.test(file.mimetype)

        if (checkExt && checkMime) {
            return cb(null, true)
        }

        return cb('File is not of an allowed type')
    }

    const storage = multer.diskStorage({
        destination: './static/uploads/',
        filename: (req, file, cb) => {
            const name = genId(16) + 
                         path.extname(file.originalname)
            cb(null, name)
        }
    })

    const upload = multer({
            storage,
            fileFilter: (req, file, cb) => {
                checkFileType(file, cb)
            }
    })

    const middleware = upload.single('thumbnail')

    middleware(req, res, (err) => {
        if (err) {
            console.error('Error', err)
            return res.status(500).send(errorResponse({}, err))
        }

        next()
    })
}

module.exports = {
    isLoggedMiddle,
    uploadMiddleware,
}