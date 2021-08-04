import { ICronLog } from "../interfaces/cronLog";
import { IDBPaginatedResponse } from "../interfaces/pagination";
import { CronLog as CronLogModel } from "../model/cronLog";
import BaseController from "./BaseController";

export default class CronLog extends BaseController {
  public async save(data: string) {
    try {
      const model = await CronLogModel.forge();
      return model.save({ description: data }, { method: "insert" });
    } catch (e) {
      console.log(e, "CronLog", "save");
    }
  }

  public async getAll(
    currentPage: number = 1
  ): Promise<IDBPaginatedResponse<ICronLog>> {
    try {
      const model = await new CronLogModel()
        .query((qb) => {
          qb.orderBy("id", "desc");
        })
        .fetchPage({
          require: false,
          pageSize: 10,
          page: currentPage,
        });
      return this.paginatedResponse<ICronLog>(model);
    } catch (e) {
      this.logError(e, "CronLog", "getAll");
    }
  }
}