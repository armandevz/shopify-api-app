const schedule = require('node-schedule');
const ProductVariants = require('../../controllers/shopify/Variants');
const CONFIG = require('../../config/config');
const DatabaseVariants2 = require('../../controllers/StockRules');


// schedule.scheduleJob('*/05 * * * * *', async () => { //0,30 * * * *
//   const variants = new ProductVariants(CONFIG.productId);
//   await variants.deleteCreateVariant();
// });

// module.exports = {
//   async backCopy90() {
schedule.scheduleJob('*/04 * * * * *', async () => {
  const variants = new ProductVariants(CONFIG.productId);
  await variants.deleteCreateVariant();
  const date = new Date();
  console.log(`The cron task completed at: ${date.toLocaleString()}`);
  console.log('===================');
});
//   },
// };

// DatabaseVariants2.getStockRules();
