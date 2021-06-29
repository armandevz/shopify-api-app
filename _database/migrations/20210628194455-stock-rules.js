exports.up = function (db, callback) {
  db.createTable('stock_rules_exceptions', {
    id: { type: 'int', primaryKey: true, autoIncrement: true },
    date: 'date',
    value: 'int',
    weight: 'int',
    inventory_quantity: 'int',
  }, callback);
  db.createTable('stock_rules', {
    id: { type: 'int', primaryKey: true },
    date: 'date',
    day_of_week: 'string',
    value: 'int',
    weight: 'int',
    inventory_quantity: 'int',
  }, callback);
};

exports.down = function (db, callback) {
  db.dropTable('stock_rules_exceptions');
  db.dropTable('stock_rules', callback);
};
