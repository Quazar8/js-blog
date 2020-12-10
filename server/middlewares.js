const multer = require('multer')
const path = require('path')
const { genId } = require('./utils')

const IsLoggedMiddle = (req, res, next) => {
    if (req.user) {
        next()
    } else {
        res.status(403).send({ error: true
            , errorMsg: 'User not logged in!'})
    }
}

const uploadMiddleware = () => {
    const checkFileType = (file, cb) => {
        const permitted = /jpeg|jpg|png/

        const ext = path.extname(file.originalname).toLowerCase()
        const checkExt = permitted.test(ext)
        const checkMime = permitted.test(file.mimetype)

        if (checkExt && checkMime) {
            return cb(null, true)
        }

        return cb('File is not a permitted type')
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

    return upload.single('thumbnail')
}

module.exports = {
    IsLoggedMiddle,
    uploadMiddleware
}