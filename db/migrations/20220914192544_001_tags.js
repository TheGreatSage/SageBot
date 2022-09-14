/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
const { init, runfile } = require('../../src/sql');
exports.up = function(knex) {
    init(knex);
    return runfile(knex, '001_tags.sql');
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    init(knex);
    return knex.schema
        .dropTableIfExists('tags');
};
