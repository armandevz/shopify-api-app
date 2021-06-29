const CONFIG = require('./config');

const knex = require('knex')({
  client: 'mysql',
  connection: {
    host: CONFIG.dbHost,
    user: CONFIG.dbUsername,
    password: CONFIG.dbPassword,
    database: CONFIG.dbDatabase,
    charset: 'utf8',
  },
});

module.exports = knex;
