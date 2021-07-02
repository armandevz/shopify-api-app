const moment = require('moment');
const { StockRuleExceptions } = require('../model/stockRules');

class StockRulesExceptions {
  async getStockExceptionPrice(currentDate) {
    try {
      const model = await new StockRuleExceptions().fetchAll();
      const data = model.toJSON();

      // const dateToday = new Date();
      // const currentDate = moment(dateToday.date).format('YYYY-MM-DD');

      return data.find((byDate) => byDate.date === currentDate) || null;
    } catch (e) {
      console.log('Variants :: getStockRulesExceptions :: error', e);
      throw new Error(e);
    }
  }

  static async saveStockRulesExceptions() {
    // Move Date() shopify/Variants.js class
    const currentDate = new Date();
    const dateTime = moment(currentDate.date).format('YYYY-MM-DD');
    try {
      const data = {
        date: dateTime,
        value: 5,
        weight: 7,
        price: 1,
        inventory_quantity: 151,
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
// saveStockRulesExceptions  getStockRulesExceptions
// StockRulesExceptions.getStockRulesExceptions();

