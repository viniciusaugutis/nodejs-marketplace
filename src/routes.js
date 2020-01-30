const express = require('express')
const routes = express.Router()

const controllers = require('../app/controllers')
const authMiddleware = require('../app/middlewares/auth')

routes.post('/users', controllers.UserController.store)
routes.post('/sessions', controllers.SessionController.store)

routes.use(authMiddleware)

routes.post('/ads', controllers.AdController.store)
routes.put('/ads/:id', controllers.AdController.update)
routes.get('/ads/:id', controllers.AdController.show)
routes.delete('/ads/:id', controllers.AdController.destroy)
routes.get('/ads', controllers.AdController.index)

/* Purchase routes */

routes.post('/purchases', controllers.PurchaseController.store)

module.exports = routes
