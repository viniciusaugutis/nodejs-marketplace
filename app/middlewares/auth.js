const authConfig = require('../../config/auth')
const jwt = require('jsonwebtoken')
const { promisify } = require('util')

module.exports = async (req, res, next) => {
  const authHeader = req.headers.authorization

  if (!authHeader) {
    return res.status(401).json({ error: 'Token not provided' })
  }

  const [, token] = authHeader.split(' ')

  try {
    const decoded = await promisify(jwt.verify)(token, authConfig.secret)
    req.userId = decoded.id // decoded tem todos dados que foram salvos junto do token jwt
    return next()
  } catch (err) {
    return res.status(401).json({ error: 'Token is invalid' })
  }
}
