const moment = require('moment');
const { StockRuleExceptions } = require('../model/stockRules');

class StockRulesExceptions {
  async getStockRulesExceptions(currentDate) {
    try {
      const model = await new StockRuleExceptions().fetchAll();
      const data = model.toJSON();

      return data.find((byDate) => byDate.date === currentDate) || null;
    } catch (e) {
      console.log('Variants :: getStockRulesExceptions :: error', e);
      throw new Error(e);
    }
  }

  static async saveStockRulesExceptions() {
    // Move Date() to the shopify/Variants.js class
    const currentDate = new Date();
    const dateTime = moment(currentDate.date).format('YYYY-MM-DD');
    try {
      const data = {
        date: dateTime,
        value: 6,
        weight: 8,
        price: 7,
        inventory_quantity: 277,
      };
      const model = await StockRuleExceptions.forge();
      await model.save(data, { method: 'insert' });
      console.log(model.toJSON());
    } catch (e) {
      console.log(`Failed to save data: ${e}`);
    }
  }

  static async deleteStockRulesExceptions(id) {
    try {
      await new StockRuleExceptions({ id }).destroy();
    } catch (e) {
      console.log(`Failed to delete data: ${e}`);
      throw new Error(e);
    }
  }
}
module.exports = StockRulesExceptions;
