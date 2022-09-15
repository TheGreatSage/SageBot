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

const migrateConfig = {
    schemaName: 'public',
    tableName: 'knex_migrations',
    directory: './db/migrations',
};

const seedConfig = {
    directory: './db/seeds',
};

const dbConfig = {
    production: {
        client: env.dbDial,
        connection: {
            user: env.dbUser,
            database: env.dbData,
            password: env.dbPass,
            port: env.dbPort,
            host: env.dbHost,
        },
        pool: poolConfig,
        migrations: migrateConfig,
        seeds: seedConfig,
        acquireConnectionTimeout: dbTimeout,
    },
    test: {
        client: env.dbDial_test,
        connection: {
            user: env.dbUser_test,
            database: env.dbData_test,
            password: env.dbPass_test,
            port: env.dbPort_test,
            host: env.dbHost_test,
        },
        pool: poolConfig,
        migrations: migrateConfig,
        seeds: seedConfig,
        acquireConnectionTimeout: dbTimeout,
    },
    development: {
        client: env.dbDial_dev,
        connection: {
            user: env.dbUser_dev,
            database: env.dbData_dev,
            password: env.dbPass_dev,
            port: env.dbPort_dev,
            host: env.dbHost_dev,
        },
        pool: poolConfig,
        migrations: migrateConfig,
        seeds: seedConfig,
        acquireConnectionTimeout: dbTimeout,
    },
};
const knexConfig = dbConfig[process.env.NODE_ENV || 'development'];

module.exports = {
    knexConfig: knexConfig,
    knexDev: dbConfig['development'],
    knexPro: dbConfig['production'],
    knexTest: dbConfig['test'],
};