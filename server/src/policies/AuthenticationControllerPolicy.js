const Joi = require('joi')

module.exports = {
  register (req, res, next) {
    const schema = {
      // Email is a string and matches the email format
      email: Joi.string().email(),
      // Password mathces the RegExp and is atleast 8-32 characters in length
      password: Joi.string().regex(
        new RegExp('^[a-zA-Z0-9]{8,32}$')
      )
    }
    // Validate req.body against our defined schema
    const {error, value} = Joi.validate(req.body, schema)
    if (error) {
      // context.key are the 'email' and 'password' in schema
      switch (error.details[0].context.key) {
        case 'email':
          res.status(400).send({
            error: 'You must provide a valid email address'
          })
          break
        case 'password':
          res.status(400).send({
            error: `The password provided failed to match the following rules.
            <br>
            1. It must be ONLY the following characters: lower case, upper case, numeric.
            <br>
            2. Itmust be atleast 8 characters in length and not greater than 32.`
          })
          break
        default:
          res.status(400).send({
            error: 'Invalid registration information'
          })
      }
    } else {
      // If the value is not used linter throws an error
      console.log(value)
      next()
    }
  }
}
