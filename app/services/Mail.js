const nodemailer = require('nodemailer')
const path = require('path')
const hbs = require('nodemailer-express-handlebars')
const exphbs = require('express-handlebars')
const mailConfig = require('../../config/mail')

const transport = nodemailer.createTransport(mailConfig)

console.log(__dirname)
const viewPath = path.resolve(__dirname, '..', 'views', 'emails')
console.log(viewPath)
transport.use('compile', hbs({
  viewEngine: exphbs.create({
    partialsDir: path.resolve(__dirname, '..', 'views', 'emails', 'partials')
  }),
  viewPath,
  extName: '.hbs'
}))
module.exports = transport
