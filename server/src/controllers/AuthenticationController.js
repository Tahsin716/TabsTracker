const {User} = require('../models')
const jwt = require('jsonwebtoken')
const config = require('../config/config')

function jwtSignUser (user) {
  const ONE_WEEK = 60 * 60 * 24 * 7
  return jwt.sign(user, config.authentication.jwtSecret, {
    expiresIn: ONE_WEEK
  })
}

module.exports = {
  async register (req, res) {
    try {
      const user = await User.create(req.body)
      res.send(user.toJSON())
    } catch (err) {
      res.status(404).send({
        error: 'This email account is already in use'
      })
    }
  },
  async login (req, res) {
    try {
      // Use destructuring to retrieve email and password from the req.body
      // Then findOne User, whose email is equal to the one retrieved from the req.body
      const {email, password} = req.body
      const user = await User.findOne({
        where: {
          email: email
        }
      })
      // If the email is not found, that means this user does not exist
      // Thus return a status of 403, to inform the user
      // About incorrect login information
      if (!user) {
        return res.status(403).send({
          error: 'The login information is incorrect'
        })
      }

      // If the email account is valid, we will then check for password correctness
      // If it is wrong we will again send a status of 403
      const isPasswordValid = password === user.password
      if (!isPasswordValid) {
        return res.status(403).send({
          error: `The password ${user.password} is not equal to ${password}`
        })
      }

      // If everything is correct return the user.toJSON()
      const userJson = user.toJSON()
      res.send({
        user: userJson,
        token: jwtSignUser(userJson)
      })
    } catch (err) {
      res.status(500).send({
        error: 'An error has occurred while trying to login'
      })
    }
  }
}
