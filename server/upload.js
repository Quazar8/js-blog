const multer = require('multer')
const path = require('path')
const { genId } = require('./utils')

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

const uploadImage = multer({
        storage,
        fileFilter: (req, file, cb) => {
            checkFileType(file, cb)
        }
})

module.exports = uploadImage
