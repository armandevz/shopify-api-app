import { CONFIG } from './config';
import connection from 'knex';

export const knex = connection({
  client: 'mysql',
  connection: {
    host: CONFIG.dbHost,
    user: CONFIG.dbUsername,
    password: CONFIG.dbPassword,
    database: CONFIG.dbDatabase,
    timezone: 'utc+0',
    dateStrings: true,
    charset: 'utf8',
  },
});
