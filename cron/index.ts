import * as schedule from 'node-schedule';
import Variants from '../controllers/shopify/Variants';
import { CONFIG } from '../config/config';
import Config from '../controllers/Config';

try {
  schedule.scheduleJob('*/04 * * * * *', async function () {
    console.log(new Config().get)
    // todo check if cron is enabled in settings - Configuration.get('cron_enabled')
    await new Variants(CONFIG.productId).deleteCreateVariant();

    console.log(`The cron task completed at: ${new Date().toLocaleString()}`);
  });
} catch (e) {
  console.log(e, 'Something went wrong in the Cron task');
}