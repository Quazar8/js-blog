const logoutUser = (req, res) => {
    req.logout()
    res.status(200)
    .clearCookie('connect.sid')
    .send({ error: false, 
                    msg: 'User logged out'})
}

module.exports = logoutUser