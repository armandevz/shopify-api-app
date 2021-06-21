require('dotenv').config({ path: '../.env' });

const { env } = process;

const CONFIG = {
  port: env.PORT,
  apiKey: env.SHOPIFY_API_KEY,
  apiPassword: env.SHOPIFY_API_PASSWORD,
  shopName: env.SHOPIFY_STOREFRONT_DOMAIN,
  productId: env.SHOPIFY_PRODUCT_ID,
};

module.exports = CONFIG;
