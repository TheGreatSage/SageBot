// Update with your config settings.

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
const { knexConfig } = require('./src/db/knexconfig.js');
module.exports = knexConfig;