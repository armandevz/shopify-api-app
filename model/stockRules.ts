import { knex } from "../config/db";

const bookshelf = require("bookshelf")(knex);

const StockRule = bookshelf.model("StockRule", {
  tableName: "stock_rules",
});

const StockRuleExceptions = bookshelf.model("StockRuleExceptions", {
  tableName: "stock_rules_exceptions",
});

export { StockRule, StockRuleExceptions };