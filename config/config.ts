require('dotenv').config();

const { env } = process;

export const CONFIG = {
  port: env.PORT,
  apiKey: env.SHOPIFY_API_KEY,
  apiPassword: env.SHOPIFY_API_PASSWORD,
  shopName: env.SHOPIFY_STOREFRONT_DOMAIN,
  productId: env.SHOPIFY_PRODUCT_ID,

  // Database credentials details
  dbHost: env.DB_HOST,
  dbUsername: env.DB_USERNAME,
  dbPassword: env.DB_PASSWORD,
  dbDatabase: env.DB_DATABASE,

  // Product variants
  variantQuantity: env.VARIANT_QUANTITY,
  variantLocation: env.VARIANT_LOCATION,

  // Host
  supportHost: env.LOCALHOST,
};
