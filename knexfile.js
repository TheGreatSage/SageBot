// Update with your config settings.

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
const db = require('./config/db.js');
module.exports = {

    development: db.development,

    staging: db.test,

    production: db.production,

};
