const { log } = require('../log');
const { knexConfig } = require('./knexconfig');

const knex = require('knex')(knexConfig);

async function select(sql, bindings = []) {
    try {
        const res = await knex.raw(sql, bindings);
        if (knexConfig.client === 'postgres') {
            return res;
        }
        const r1 = {
            rowCount: 0,
            rows: [],
        };
        // Only sqlite3 right now, as havn't tryed mysql
        for (let i = 0; i < res.length; i++) {
            const row = res[i];
            r1.rows[i] = row;
            r1.rowCount++;
        }
        return r1;
    } catch (err) {
        log.info(`Select Error: ${err}`);
    }
}

module.exports = {
    knex: knex,
    select: select,
};