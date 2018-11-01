const express = require('express')

const authRoutes = (User) => {
    const authRouter = express.Router()
    const authController = require('../controllers/authController')(User)

    authRouter.route('/')
    .post(authController.signIn)

    return authRouter
}

module.exports = authRoutes