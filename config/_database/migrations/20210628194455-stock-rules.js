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

  db.createTable('config', {
    id: { type: 'int', primaryKey: true, autoIncrement: true },
    key: 'varchar',
    value: 'varchar'
  });

  db.createTable('cronLog', {
    id: { type: 'int', primaryKey: true, autoIncrement: true },
    date: 'date',
    description: 'varchar'
  });
};

exports.down = function (db, callback) {
  db.dropTable('config');
  db.dropTable('stock_rules_exceptions');
  db.dropTable('stock_rules', callback);
  db.dropTable('cronLog');
};