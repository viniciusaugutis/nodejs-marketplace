const express = require('express')
const routes = express.Router()

const controllers = require('../app/controllers')
const authMiddleware = require('../app/middlewares/auth')

routes.post('/users', controllers.UserController.store)

// routes.use(authMiddleware)
routes.post('/sessions', controllers.SessionController.store)

module.exports = routes
