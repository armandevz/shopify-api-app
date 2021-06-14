const env = require('dotenv').config({ path: '../.env' });
const axios = require('axios');
const { getStore } = require('../keyrotator');

const keyRoto = getStore().getKeyRotator('admin');
const shopifyClient = axios.create({
  baseURL: process.env.SHOPIFY_API_BASE_URL,
  // baseURL: process.env.SHOPIFY_API,
});

/**
 * Use KeyRotator to cycle credentials
 * by intercepting each request.
 */
shopifyClient.interceptors.request.use((config) => {
  const { key, password } = keyRoto.get();

  /* eslint-disable-next-line no-param-reassign */
  config.auth = {
    username: key,
    password,
  };

  return config;
});

module.exports = shopifyClient;
