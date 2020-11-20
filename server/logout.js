const logoutUser = (req, res) => {
    req.logout()
    res.status(200).send({ error: false, 
                    msg: 'User logged out'})
}

module.exports = logoutUser