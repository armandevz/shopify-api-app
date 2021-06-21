const schedule = require('node-schedule');
const ProductVariants = require('../../controllers/shopify/variants');
const CONFIG = require('../../config/config');

// schedule.scheduleJob('*/05 * * * * *', async () => { //0,30 * * * *
//   const variants = new ProductVariants(CONFIG.productId);
//   await variants.deleteCreateVariant();
// });

module.exports = {
  async backCopy90() {
    schedule.scheduleJob('*/05 * * * * *', async () => {
      const variants = new ProductVariants(CONFIG.productId);
      await variants.deleteCreateVariant();
      const date = new Date();
      console.log(`The cron task completed at: ${date.toLocaleString()}`);
      console.log('===================');
    });
  },
};
