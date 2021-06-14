const logger = require('signale');
const { argv } = require('yargs');
const schedule = require('node-schedule');
const shopifyClient = require('../ports/shopify/client');

const createVariant = async (product_id, data) => {
  const url = `products/${product_id}/variants.json`;
  const variant = await shopifyClient.post(url, data).catch((error) => {
    logger.error(error.response.status);
    logger.error(error.response.statusText);
    logger.error(error.response.data.error);
    logger.error(error.response.config.url);
    logger.error(error.response.config.data);
  });
  return variant;
};

const getVariants = async (product_id) => {
  const url = `products/${product_id}/variants.json`;
  const result = await shopifyClient.get(url, { params: {} }).catch((error) => {
    logger.error(error.response.status);
    logger.error(error.response.statusText);
    logger.error(error.response.data.error);
    logger.error(error.response.config.url);
    logger.error(error.response.config.data);
    logger.error(error);
    return false;
  });
  return result;
};

const deleteVariant = async (product_id, variant_id = false) => {
  const url = `products/${product_id}/variants/${variant_id}.json`;
  const result = await shopifyClient.delete(url).catch((error) => {
    logger.error(error.response.status);
    logger.error(error.response.statusText);
    logger.error(error.response.data.error);
    logger.error(error.response.config.url);
    logger.error(error.response.config.data);
  });
  return result;
};

const main = async () => {
  if (!argv.product_id) {
    logger.error('Need to specify product ID!');
    process.exit(1);
  }

  const { product_id } = argv;

  if (argv.create) {
    const { option1 } = argv;
    const { price } = argv;
    const { sku } = argv;

    await createVariant(product_id, { variant: { option1, price, sku } });
  }

  if (argv.get) {
    await getVariants(product_id);
  }

  if (argv.delete) {
    const { variant_id } = argv;

    await deleteVariant(product_id, variant_id);
  }

  if (argv.updateLatestVariant) {
    const { option1 } = argv;
    const { price } = argv;
    const { sku } = argv;

    const { data: { variants } } = await getVariants(product_id);

    await deleteVariant(product_id, variants[0].id);
    await createVariant(product_id, { variant: { option1, price, sku } });
  }
};

main();

// eslint-disable-next-line max-len
// npm run variants-cron -- --product_id=6667291459782 --updateLatestVariant --option1="2" --price="20" --sku="2"
