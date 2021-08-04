import { DayNumbers, IStockRule } from "../interfaces/stockRules";
import { StockRule as StockRuleModel } from "../model/stockRules";
import BaseController from "./BaseController";

export default class StockRules extends BaseController {
  public async getStockRules(dayOfWeek: DayNumbers): Promise<IStockRule> {
    try {
      const model = await new StockRuleModel()
        .where({ day_of_week: dayOfWeek })
        .fetch({ require: false });
      return model ? model.toJSON() : null;
    } catch (e) {
      this.logError(e, "StockRules", "getStockRules");
    }
  }

  public async getAllStockRules(): Promise<IStockRule[]> {
    try {
      const model = await new StockRuleModel().fetchAll({ require: false });
      return model ? model.toJSON() : null;
    } catch (e) {
      this.logError(e, "StockRules", "getAllStockRules");
    }
  }

  //  This part of script is to save data to StockRules table
  public async saveStockRules(data: IStockRule[]) {
    StockRuleModel.where("day_of_week", "!=", 0).destroy();

    await Promise.all(
      data.map(async (row) => {
        try {
          const model = await StockRuleModel.forge();
          await model.save(row, { method: "insert" });
          return true;
        } catch (e) {
          this.logError(e, "StockRules", "saveStockRules");
        }
      })
    );
  }
}