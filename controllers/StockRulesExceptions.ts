import { IStockRuleExceptions } from '../interfaces/stockRules';
import { StockRuleExceptions as StockRuleExceptionsModel } from '../model/stockRules';
import BaseController from './BaseController';

export default class StockRulesExceptions extends BaseController {
  static logError: any;
  async getStockRulesExceptions(
    date: Date
  ): Promise<IStockRuleExceptions | null> {
    try {
      const model = await new StockRuleExceptionsModel().where({ date }).fetch({
        require: false,
      });
      return model ? model.toJSON() : null;
    } catch (e) {
      this.logError(e, 'StockRulesExceptions', 'getStockRulesExceptions')
    }
  }

  async getAllStockRulesExceptions(): Promise<IStockRuleExceptions | null> {
    try {
      const model = await new StockRuleExceptionsModel().fetchAll();
      return model.toJSON();
    } catch (e) {
      this.logError(e, 'StockRulesExceptions', 'getAllStockRulesExceptions')
    }
  }

  async saveStockRulesExceptions(
    data: IStockRuleExceptions
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
      } else {
        existingData.save(data, { method: 'update' });
        return null;
      }
    } catch (e) {
      this.logError(e, 'StockRulesExceptions', 'saveStockRulesExceptions')
    }
  }

  static async deleteStockRulesExceptions(id): Promise<boolean> {
    try {
      await new StockRuleExceptionsModel({ id }).destroy();
      return true;
    } catch (e) {
      this.logError(e, 'StockRulesExceptions', 'deleteStockRulesExceptions')
    }
  }
}