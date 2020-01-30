const express = require('express')
const routes = express.Router()

const UserController = require('../app/controllers/UserController')
const SessionController = require('../app/controllers/SessionController')
const authMiddleware = require('../app/middlewares/auth')

routes.post('/users', UserController.store)

routes.use(authMiddleware)
routes.post('/sessions', SessionController.store)

module.exports = routes
