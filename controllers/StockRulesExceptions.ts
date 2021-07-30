import { IStockRuleExceptions } from '../interfaces/stockRules';
import { StockRuleExceptions as StockRuleExceptionsModel } from '../model/stockRules';
import BaseController from './BaseController';

export default class StockRulesExceptions extends BaseController {
  static logError: any;

  public async getStockRulesExceptions(
    date: Date,
  ): Promise<IStockRuleExceptions | null> {
    try {
      const model = await new StockRuleExceptionsModel().where({ date }).fetch({
        require: false,
      });
      return model ? model.toJSON() : null;
    } catch (e) {
      this.logError(e, 'StockRulesExceptions', 'getStockRulesExceptions');
    }
  }

  public async getAllStockRulesExceptions(): Promise<IStockRuleExceptions | null> {
    try {
      const model = await new StockRuleExceptionsModel().fetchAll();
      return model.toJSON();
    } catch (e) {
      this.logError(e, 'StockRulesExceptions', 'getAllStockRulesExceptions');
    }
  }

  public async saveStockRulesExceptions(
    data: IStockRuleExceptions,
  ): Promise<IStockRuleExceptions> {
    try {
      const existingData = await new StockRuleExceptionsModel()
        .where({ date: data.date })
        .fetch({
          require: false,
        });

      // This part to update data
      if (!existingData) {
        const model = await StockRuleExceptionsModel.forge();
        return model.save(data, { method: 'insert' });
      }
      existingData.save(data, { method: 'update' });
      return null;
    } catch (e) {
      this.logError(e, 'StockRulesExceptions', 'saveStockRulesExceptions');
    }
  }
}
