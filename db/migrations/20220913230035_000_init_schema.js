/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

const { runfile } = require('../../src/db/sql');


exports.up = function(knex) {
    return runfile(knex, '000_init_schema.sql');
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema
        .dropSchemaIfExists('discbot');
};