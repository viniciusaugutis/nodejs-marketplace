const express = require('express')
const validate = require('express-validation')
const routes = express.Router()

const controllers = require('./app/controllers')
const validators = require('./app/validators')
const authMiddleware = require('./app/middlewares/auth')

routes.post('/users', validate(validators.User), controllers.UserController.store)
routes.post('/sessions', validate(validators.Session), controllers.SessionController.store)

routes.use(authMiddleware)

routes.post('/ads', validate(validators.Ad), controllers.AdController.store)
routes.put('/ads/:id', validate(validators.Ad), controllers.AdController.update)
routes.get('/ads/:id', controllers.AdController.show)
routes.delete('/ads/:id', controllers.AdController.destroy)
routes.get('/ads', controllers.AdController.index)

/* Purchase routes */

routes.post('/purchases', validate(validators.Purchase), controllers.PurchaseController.store)

module.exports = routes
