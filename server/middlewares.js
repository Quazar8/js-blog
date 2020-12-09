const multer = require('multer')

const IsLoggedMiddle = (req, res, next) => {
    if (req.user) {
        next()
    } else {
        res.status(403).send({ error: true
            , errorMsg: 'User not logged in!'})
    }
}

const upload = multer({
    dest: 'uploads/'
})

module.exports = {
    IsLoggedMiddle,
    upload
}