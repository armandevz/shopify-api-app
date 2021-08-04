exports.up = function (db, callback) {
  for (let i = 1; i <= 7; i++) {
    db.runSql(`insert into stock_rules(day_of_week, weight, price, inventory_quantity) values (${i}, 1, 1, 200);`);
  }
  callback();
};

exports.down = function (db, callback) {
  db.runSql(`delete from stock_rules;`);
  callback();
};