import * as schedule from "node-schedule";
import Variants from "../controllers/shopify/Variants";
import { CONFIG } from "../config/config";
import Config from "../controllers/Config";
import CronLog from "../controllers/CronLog";

schedule.scheduleJob("*/04 * * * * *", async function () {
  try {
    const getRulesData = await new Config().get("cronEnabled");

    if (getRulesData.value == "1") {
      await new Variants(CONFIG.productId).deleteCreateVariant();
      console.log(`The cron task completed at: ${new Date().toLocaleString()}`);
    }
    await new CronLog().save("successes");
  } catch (e) {
    await new CronLog().save("fail");
  }
});
