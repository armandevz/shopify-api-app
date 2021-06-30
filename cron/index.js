const schedule = require('node-schedule');
const ProductVariants = require('../controllers/shopify/Variants');
const CONFIG = require('../config/config');

// The commented out code can be uncommented and used via /config/server/server.js

// module.exports = {
//   async backCopy90() {
try {
  schedule.scheduleJob('*/04 * * * * *', async () => {
    const variants = new ProductVariants(CONFIG.productId);
    await variants.deleteCreateVariant();
    const date = new Date();
    console.log(`The cron task completed at: ${date.toLocaleString()}`);
    console.log('===================');
  });
} catch (e) {
  console.log(e, 'Something went wrong in the Cron task');
}
//   },
// };
