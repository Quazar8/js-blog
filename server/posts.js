const postArticle = (req, res) => {
    res.status(200).send({ error: false, msg: 'Posted' })
}

module.exports = {
    postArticle
}