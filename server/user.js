const getUserProfile = (req, res) => {
    res.send({ error: false, id: req.params.userId})
}

module.exports = {
    getUserProfile
}