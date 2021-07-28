import { ICronLog } from "../interfaces/cronLog";
import { CronLog as CronLogModel } from "../model/cronLog";
import BaseController from "./BaseController";

export default class CronLog extends BaseController {
  public async save(data: ICronLog): Promise<ICronLog> {
    try {
      const existingData = await new CronLogModel()
        .where({ date: Date })
        .fetch({
          require: false,
        });

      // This part to update data
      if (!existingData) {
        const model = await CronLogModel.forge();
        return model.save(data, { method: "insert" });
      } else {
        existingData.save(data, { method: "update" });
        return null;
      }
    } catch (e) {
      this.logError(e, "CronLog", "save");
    }
  }
}
