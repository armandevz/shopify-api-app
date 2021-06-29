const { StockRule } = require('../model/stockRules');

class StockRules {
  // eslint-disable-next-line class-methods-use-this
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

  // static async getStockRulesExceptions() {
  //   // get rules exceptions from DB
  // }
}

module.exports = StockRules;
