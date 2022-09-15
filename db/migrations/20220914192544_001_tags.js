/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
const { runfile } = require('../../src/db/sql');
exports.up = function(knex) {
    return runfile(knex, '001_tags.sql');
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema
        .dropTableIfExists('tags');
};
