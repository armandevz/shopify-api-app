import * as schedule from "node-schedule";
import Variants from "../controllers/shopify/Variants";
import { CONFIG } from "../config/config";
import Config from "../controllers/Config";
import CronLog from "../controllers/CronLog";

try {
  schedule.scheduleJob("*/04 * * * * *", async function () {
    const getRulesData = await new Config().get("cronEnabled");
    await new CronLog().save("Cron description:" );
    await new CronLog().getAll();
    console.log("Get Rules Data", getRulesData);

    if (getRulesData.value == "1") {
      await new Variants(CONFIG.productId).deleteCreateVariant();
      console.log(`The cron task completed at: ${new Date().toLocaleString()}`);
    }
  });
} catch (e) {
  console.log(e, "Something went wrong in the Cron task");
}