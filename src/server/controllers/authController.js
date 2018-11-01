const authController = (User) => {
    const getAll = (req, res) => {
        res.json({msg: 'hi'})
    }

    return {
        getAll
    }
}

module.exports = authController