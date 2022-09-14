const env = require('../env.js');

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
        pool: {
            min: 2,
            max: 10,
        },
        migrations: {
            schemaName: 'public',
            tableName: 'knex_migrations',
            directory: './db/migrations',
        },
        seeds: {
            directory: './db/seeds',
        },
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
        pool: {
            min: 2,
            max: 10,
        },
        migrations: {
            schemaName: 'public',
            tableName: 'knex_migrations',
            directory: './db/migrations',
        },
        seeds: {
            directory: './db/seeds',
        },
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
        pool: {
            min: 0,
            max: 10,
        },
        migrations: {
            schemaName: 'public',
            tableName: 'knex_migrations',
            directory: './db/migrations',
        },
        seeds: {
            directory: './db/seeds',
        },
        acquireConnectionTimeout: 10000,
    },
};
const knexConfig = dbConfig[process.env.NODE_ENV || 'development'];

module.exports = {
    knexConfig: knexConfig,
};