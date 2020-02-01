const express = require('express')
const validate = require('express-validation')
const routes = express.Router()

const controllers = require('./app/controllers')
const validators = require('./app/validators')
const authMiddleware = require('./app/middlewares/auth')
const handler = require('express-async-handler')

routes.post('/users', validate(validators.User), handler(controllers.UserController.store))
routes.post('/sessions', validate(validators.Session), handler(controllers.SessionController.store))

routes.use(authMiddleware)

routes.post('/ads', validate(validators.Ad), handler(controllers.AdController.store))
routes.put('/ads/:id', validate(validators.Ad), handler(controllers.AdController.update))
routes.get('/ads/:id', handler(controllers.AdController.show))
routes.delete('/ads/:id', handler(controllers.AdController.destroy))
routes.get('/ads', handler(controllers.AdController.index))

/* Purchase routes */

routes.post('/purchases', validate(validators.Purchase), handler(controllers.PurchaseController.store))

module.exports = routes
