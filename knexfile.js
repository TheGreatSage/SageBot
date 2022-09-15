// Update with your config settings.

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
const { knexDev, knexPro, knexTest } = require('./src/db/knexconfig.js');
module.exports = {

    development: knexDev,

    staging: knexTest,

    production: knexPro,

};
