const { StockRuleExceptions } = require('../model/stockRules');

class StockRulesExceptions {
  static async getStockRulesExceptions() {
    try {
      const model = await new StockRuleExceptions().fetch();
      console.log(model.toJSON());
      return model.toJSON();
    } catch (e) {
      console.log('Variants :: getStockRulesExceptions :: error', e);
      throw new Error(e);
    }
  }

  static async saveStockRulesExceptions() {
    try {
      const data = {
        date: new Date(),
        value: 143,
        weight: 33,
        price: 2,
        inventory_quantity: 1,
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
