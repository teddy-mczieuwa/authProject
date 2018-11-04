const express = require('express')
const passport  = require('passport')
require('../services/passport')
const requireSignin = passport.authenticate('local', {session: false})

const authRoutes = (User) => {
    const authRouter = express.Router()
    const authController = require('../controllers/authController')(User)

    authRouter.route('/signup')
    .post(authController.signUp)

    authRouter.route('/signin')
    .post(requireSignin, authController.signIn)

    authRouter.route('/logout')
    .get(authController.logout)

    return authRouter
}

module.exports = authRoutes