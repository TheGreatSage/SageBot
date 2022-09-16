/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

const { runfile } = require('../../src/db/sql');
const { knexConfig } = require('../../src/db/knexconfig');

exports.up = function(knex) {
    if (knexConfig.client === 'postgres') {
        return runfile(knex, '000_init_schema.sql', 'migrations');
    } else {
        return Promise.resolve();
    }
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    if (knexConfig.client === 'postgres') {
        return knex.schema
            .dropSchemaIfExists('discbot');
    } else {
        return Promise.resolve();
    }
};