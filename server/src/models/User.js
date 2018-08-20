// The User.js is going to take in sequelize and DataTypes as arguments
// Then sequelize is going to define a 'User' model, with the datas
// Email which will be unique for all users, and Password
module.exports = (sequelize, DataTypes) =>
  sequelize.define('User', {
    email: {
      type: DataTypes.STRING,
      unique: true
    },
    password: DataTypes.STRING
  })
