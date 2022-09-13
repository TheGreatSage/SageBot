const fs = require('fs');
const env = require('../src/env.js');

module.exports = {
    production: {
    username: env.dbUser,
    password: env.dbPass,
    database: env.dbData,
    host: env.dbHost,
    port: env.dbPort,
    dialect: env.dbDial,
    dialectOptions: {
      bigNumberStrings: true
    }
  },
  test: {
    username: env.dbUser_test,
    password: env.dbPass_test,
    database: env.dbData_test,
    host: env.dbHost_test,
    port: env.dbPort_test,
    dialect: env.dbDial_test,
    dialectOptions: {
      bigNumberStrings: true
    }
  },
    development: {
    username: env.dbUser_dev,
    password: env.dbPass_dev,
    database: env.dbData_dev,
    host: env.dbHost_dev,
    port: env.dbPort_dev,
    dialect: env.dbDial_dev,
    dialectOptions: {
      bigNumberStrings: true,
    }
  }
};