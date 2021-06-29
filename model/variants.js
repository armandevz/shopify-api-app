const knex = require('../config/db');
const bookshelf = require('bookshelf')(knex);

const Var = bookshelf.model('Var', {
  tableName: 'nyt_shopify',
});

module.exports = Var;
