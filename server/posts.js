const postArticle = (req, res) => {
    if (req.user) {
        res.status(200).send({ error: false, 
            body: req.body })
    } else {
        res.status(500).send({ error: true, 
            errorMsg: 'User not logged in'})
    }
}

module.exports = {
    postArticle
}