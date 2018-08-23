const AuthenticationController = require('./controllers/AuthenticationController')

const AuthenticationControllerPolicy = require('./policies/AuthenticationControllerPolicy')

// It exports a function, and takes in app as a parameter
module.exports = (app) => {
  // The POST method refactored in here
  // But before that AuthenticationControllerPolicy.register is hit as an express middleware
  // Which will validate user inputs using Joi and then call next() for
  // AuthenticationController.register to fire
  app.post('/register',
    AuthenticationControllerPolicy.register,
    AuthenticationController.register)
  // Server end-point for login method
  app.post('/login',
    AuthenticationController.login)
}
