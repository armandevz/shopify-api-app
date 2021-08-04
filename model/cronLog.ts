import { knex } from "../config/db";

const bookshelf = require("bookshelf")(knex);

const CronLog = bookshelf.model("CronLog", {
  tableName: "cronLog",
});

export { CronLog };