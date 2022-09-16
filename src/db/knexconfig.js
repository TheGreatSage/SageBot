const env = require('../env.js');

const dbTimeout = 10000;

const poolConfig = {
    min: 0,
    max: 10,
    afterCreate: function(conn, done) {
        const sql = 'SET search_path TO discbot;';
        conn.query(sql, function(err) {
            done(err, conn);
        });
    },
};

const seedConfig = {
    directory: './db/seeds',
};

const knexC = (config) => {
    const envC = env.dbConf[config];

    const migrateConfig = {
        tableName: 'knex_migrations',
        directory: './db/migrations',
    };

    const dbC = {
        client: envC['dialect'],
        connection: {
            user: envC['user'],
            database: envC['data'],
            password: envC['pass'],
            port: envC['port'],
            host: envC['host'],
            filename: envC['file'],
        },
        acquireConnectionTimeout: dbTimeout,
        migrations: migrateConfig,
        seeds: seedConfig,
    };
    if (dbC.client === 'postgres') {
        dbC.migrations['schemaName'] = 'public';
        dbC['pool'] = poolConfig;
    } else if (dbC.client === 'sqlite3' || dbC.client === 'better-sqlite3') {
        dbC['useNullAsDefault'] = true;
    }

    const r = dbC;
    return r;
};

const current = process.env.NODE_ENV || 'development';

module.exports = {
    knexConfig: knexC(current),
    getConfig: knexC,
};