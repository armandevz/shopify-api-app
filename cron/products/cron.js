const schedule = require('node-schedule');
const ProductVariants = require('../../controllers/shopify/variants');

schedule.scheduleJob('*/05 * * * * *', async () => {
  const variants = new ProductVariants();
  await variants.deleteCreateVariant();
});
