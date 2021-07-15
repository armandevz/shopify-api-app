import * as schedule from 'node-schedule';
import Variants from '../controllers/shopify/Variants';
import { CONFIG } from '../config/config';

try {
  schedule.scheduleJob('*/04 * * * * *', async function () {
    await new Variants(CONFIG.productId).deleteCreateVariant();

    console.log(`The cron task completed at: ${new Date().toLocaleString()}`);
  });
} catch (e) {
  console.log(e, 'Something went wrong in the Cron task');
}
