const express = require('express')

const authRoutes = (User) => {
    const authRouter = express.Router()
    const authController = require('../controllers/authController')(User)

    authRouter.route('/signup')
    .post(authController.signUp)

    authRouter.route('/signin')
    .post(authController.signIn)

    authRouter.route('/logout')
    .get(authController.logout)

    return authRouter
}

module.exports = authRoutes