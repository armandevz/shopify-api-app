import { IStockRule } from '../interfaces/stockRules';

const { StockRule } = require('../model/stockRules');
const BaseController = require('./BaseController');

class StockRules extends BaseController {
  async getStockRules(dayOfWeek): Promise<IStockRule> {
    try {
      const model = await new StockRule().fetchAll();
      const data = model.toJSON();

      return data.find((week) => week.day_of_week === dayOfWeek) || null;
    } catch (e) {
      console.log('Variants :: getVariantWeight :: error', e);
      throw new Error(e);
    }
  }

  async getAllStockRules() {
    try {
      const model = await new StockRule().fetchAll();
      return model.toJSON();
    } catch (e) {
      console.log('StockRules :: getAllStockRules :: error', e);
      throw new Error(e);
    }
  }

  //  This part of script is to save data to StockRules table
  async saveStockRules(data: IStockRule[]): Promise<boolean> {
    try {
      const model = await StockRule.forge();
      return model.save(data, { method: 'insert' });
    } catch (e) {
      console.log(`Failed to save data: ${e}`);
    }
  }

  //  This part of script is to delete data from StockRules table
  static async deleteStockRules(id): Promise<boolean> {
    try {
      await new StockRule({ id }).destroy();
      return true;
    } catch (e) {
      console.log(`Failed to save data: ${e}`);
      throw new Error(e);
    }
  }
}

module.exports = StockRules;
