const fs = require('node:fs/promises');
const path = require('node:path');
// const knex = require('knex');
const { log } = require('../log');

async function query(file) {
    let sql = path.join(__dirname, '..', '..', 'db', 'queries');
    if (arguments.length > 1) {
        for (let i = 1; i < arguments.length; i++) {
            if (typeof arguments[i] === 'string') {
                sql = path.join(sql, arguments[i]);
            } else {
                for (let o = 0; o < arguments[i].length; o++) {
                    sql = path.join(sql, arguments[i][o]);
                }
            }
        }
    }
    if (!file.endsWith('.sql')) {
        file = file.concat('.sql');
    }
    sql = path.join(sql, file);
    return sqlfile(sql);
}

async function sqlfile(file) {
    const sql = await fs.readFile(file, (err, buff) => {
        if (err) {
            log.error(err);
            return;
        }
        log.info(buff);
        return buff;
    });
    return sql.toString();
}

async function runfile(knex, file) {
    const folders = Array.prototype.slice.call(arguments, 2);
    const sql = await query(file, folders);
    log.info(sql);
    await knex.raw(sql);
}

module.exports = {
    runfile: runfile,
    query: query,
};