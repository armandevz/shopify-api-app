exports.up = function (db, callback) {
  db.createTable('stock_rules_exceptions', {
    id: { type: 'int', primaryKey: true, autoIncrement: true },
    date: 'date',
    inventory_quantity: 'int',
  }, callback);
  db.createTable('stock_rules', {
    id: { type: 'int', primaryKey: true, autoIncrement: true },
    day_of_week: 'smallint',
    weight: 'int',
    price: 'decimal',
    inventory_quantity: 'int',
  }, callback);
  db.createTable('cron_rule', {
    id: { type: 'int', primaryKey: true, autoIncrement: true },
    state: 'int',
  });
};

exports.down = function (db, callback) {
  db.dropTable('cron_rule');
  db.dropTable('stock_rules_exceptions');
  db.dropTable('stock_rules', callback);
};