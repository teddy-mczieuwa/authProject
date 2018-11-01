const express = require('express')

const authRoutes = (User) => {
    const authRouter = express.Router()
    const authController = require('../controllers/authController')(User)

    authRouter.route('/')
    .get(authController.getAll)

    return authRouter
}

module.exports = authRoutes