const postArticle = (req, res) => {
    res.status(200).send({ error: false, body: req.body })
}

module.exports = {
    postArticle
}