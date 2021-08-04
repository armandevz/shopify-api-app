import { knex } from "../config/db";

const bookshelf = require("bookshelf")(knex);

const Config = bookshelf.model("Config", {
  tableName: "config",
});

export { Config };