const { StockRule } = require('../model/stockRules');
const BaseController = require('./BaseController');

class StockRules extends BaseController {
  async getVariantPrice() {
    try {
      const model = await new StockRule().fetch();
      console.log(model.toJSON());
      return model.toJSON();
    } catch (e) {
      return this.logError(e, 'StockRules', 'getStockRules');
    }
  }

  // static async getStockRulesExceptions() {
  //   get rules exceptions from DB
  // }
}

module.exports = StockRules;
