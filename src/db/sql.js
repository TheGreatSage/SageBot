const fs = require('node:fs/promises');
const path = require('node:path');
// const knex = require('knex');
const { log } = require('../log');
const set_schema_file = '000_set_schema.sql';

async function runfile(knex, file) {
    const sql_path = path.join(__dirname, '..', 'db', 'queries', file);
    log.info(sql_path);
    const sql = await fs.readFile(sql_path, (err, buff) => {
        if (err) {
            log.error(err);
            return;
        }
        log.info(buff);
        return buff;
    });
    log.info(sql.toString());
    await knex.raw(sql.toString());
}

async function set_schema(knex) {
    await runfile(knex, set_schema_file);
}

module.exports = {
    init: set_schema,
    runfile: runfile,
};