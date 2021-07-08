import { IStockRule } from "../interfaces/stockRules";

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

  //  This part of script is to save data to StockRules table
  static async saveStockRules(): Promise<IStockRule> {
    try {
      const data = {
        day_of_week: 5,
        value: 5,
        weight: 5,
        price: 5,
        inventory_quantity: 200,
      };
      const model = await StockRule.forge();
      return model.save(data, { method: 'insert' });
      // console.log(model.toJSON());
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
