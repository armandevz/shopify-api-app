require('dotenv').config({ path: '../.env' });

const { env } = process;

const CONFIG = {
  port: env.PORT,
  dbServiceGraphQL: env.DATABASE_SERVICE,
  configurationKeys: {
    apiKey: env.SHOPIFY_API_KEY,
    apiPassword: env.SHOPIFY_API_PASSWORD,
  },
};
export default CONFIG;
