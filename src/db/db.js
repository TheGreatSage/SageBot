const { knexConfig } = require('./knexconfig');

const knex = require('knex')(knexConfig);

module.exports = {
    knex: knex,
};