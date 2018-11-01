const userController = () => {
    const getUser = (req, res) => {
        res.json(req.user)
    }
    return {
        getUser
    }
}

module.exports = userController