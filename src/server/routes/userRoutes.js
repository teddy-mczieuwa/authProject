const express = require('express')
const passport = require('passport')
require('../services/passport')
const requireAuth = passport.authenticate('jwt', {session: false})

const userRoutes = (User) => {
    const userRouter = express.Router()
    const userController = require('../controllers/userController')()

    userRouter.route('/')
    .get(requireAuth, userController.getUser)

    return userRouter
}

module.exports = userRoutes