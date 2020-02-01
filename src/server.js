const express = require('express')
const mongoose = require('mongoose')
const databaseConfig = require('./config/database')
const validate = require('express-validation')
const Youch = require('youch') // formatador de erros, para deixar para legivel
const Sentry = require('@sentry/node')
const sentryConfig = require('./config/sentry')

class App {
  constructor () {
    this.express = express()
    this.isDev = process.env.NODE_ENV !== 'production'
    this.sentry()
    this.database()
    this.middlewares()
    this.routes()
    this.exception()
  }

  sentry () {
    Sentry.init({ dsn: sentryConfig.dsn })
  }

  middlewares () {
    this.express.use(Sentry.Handlers.requestHandler())
    this.express.use(express.json())
  }

  routes () {
    this.express.use(require('./routes'))
  }

  database () {
    // mongoose.connect('mongodb://usuario:senha@localhost:27017/nomedatabase') - quando roda local
    mongoose.connect(databaseConfig.uri, {
      useCreateIndex: true,
      useNewUrlParser: true
    })
  }

  exception () {
    // if (process.env.NODE_ENV === 'production') {
    this.express.use(Sentry.Handlers.errorHandler())
    // }
    this.express.use(async (err, req, res, next) => {
      // midlleware quando recebe 4 parâmetros, o primeiro parâmetro é o erro
      if (err instanceof validate.ValidationError) {
        return res.status(err.status).json(err)
      }

      if (process.env.NODE_ENV !== 'production') {
        const youch = new Youch(err, req)
        return res.json(await youch.toJSON())
      }

      return res
        .status(err.status || 500)
        .json({ error: 'Internal server error' })
    })
  }
}

module.exports = new App().express
