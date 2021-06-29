const knex = require('../config/db');
const bookshelf = require('bookshelf')(knex);

const StockRule = bookshelf.model('StockRule', {
  tableName: 'stock_rules_exceptions',
});

module.exports = { StockRule };
