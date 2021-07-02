const CONFIG = require('./config');

const knex = require('knex')({
  client: 'mysql',
  connection: {
    host: CONFIG.dbHost,
    user: CONFIG.dbUsername,
    password: CONFIG.dbPassword,
    database: CONFIG.dbDatabase,
    timezone: 'utc+0',
    dateStrings: 'date',
    charset: 'utf8',
  },
});

module.exports = knex;
