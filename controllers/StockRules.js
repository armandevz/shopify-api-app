const { StockRule } = require('../model/stockRules');
const BaseController = require('./BaseController');

class StockRules extends BaseController {
  static async getStockRules() {
    try {
      const model = await new StockRule().fetch();
      console.log(model.toJSON());
      return model.toJSON();
    } catch (e) {
      console.log('Variants :: getStockRules :: error', e);
      throw new Error(e);
    }
  }

  //  This part of script is to save data to StockRules table
  static async saveStockRules() {
    try {
      const data = {
        date: new Date(),
        day_of_week: 22,
        value: 13,
        weight: 25,
        price: 2,
        inventory_quantity: 20,
      };
      const model = await StockRule.forge();
      await model.save(data, { method: 'insert' });
      console.log(model.toJSON());
    } catch (e) {
      console.log(`Failed to save data: ${e}`);
    }
  }

  //  This part of script is to delete data from StockRules table
  static async deleteStockRules(id) {
    try {
      await new StockRule({ id }).destroy();
    } catch (e) {
      console.log(`Failed to save data: ${e}`);
      throw new Error(e);
    }
  }
}
module.exports = StockRules;
