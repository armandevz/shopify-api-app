import { IStockRuleExceptions } from '../interfaces/stockRules';
import { StockRuleExceptions as StockRuleExceptionsModel } from '../model/stockRules';
import BaseController from './BaseController';

export default class StockRulesExceptions extends BaseController {
  async getStockRulesExceptions(
    date: Date,
  ): Promise<IStockRuleExceptions | null> {
    try {
      const model = await new StockRuleExceptionsModel().where({ date }).fetch({
        require: false,
      });
      return model ? model.toJSON() : null;
    } catch (e) {
      console.log('Variants :: getStockRulesExceptions :: error', e);
      throw new Error(e);

      // use this.logError
    }
  }

  async getAllStockRulesExceptions(): Promise<IStockRuleExceptions | null> {
    try {
      const model = await new StockRuleExceptionsModel().fetchAll();
      return model.toJSON();

      // todo use the same structure as in StockRules.getAllStockRules
    } catch (e) {
      console.log(
        'StockRulesExceptions :: getAllStockRulesExceptions :: error',
        e,
      );
      throw new Error(e);
    }
  }

  async saveStockRulesExceptions(
    data: IStockRuleExceptions,
  ): Promise<IStockRuleExceptions> {
    try {
      // const existingData = await this.getStockRulesExceptions(data.date);
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
      console.log(`Failed to save data: ${e}`);
    }
  }

  static async deleteStockRulesExceptions(id): Promise<boolean> {
    try {
      await new StockRuleExceptionsModel({ id }).destroy();
      return true;
    } catch (e) {
      console.log(`Failed to delete data: ${e}`);
      throw new Error(e);
    }
  }
}
