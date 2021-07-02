const { StockRule } = require('../model/stockRules');
const BaseController = require('./BaseController');

class StockRules extends BaseController {
  async getVariantWeight(dayOfWeek) {
    try {
      const model = await new StockRule().fetchAll();
      const data = model.toJSON();

      // const currentDate = new Date();
      // console.log(currentDate.getDay());

      // const currentDate = new Date();
      // const currentDayOfWeek = currentDate.toLocaleString('default', { weekday: 'long' });
      // const objVariant = data.find((week) => week.day_of_week === currentDayOfWeek);
      // const currentDayOfWeek = currentDate.getDay();
      const objVariant = data.find((week) => week.day_of_week === dayOfWeek);
      // console.log(objVariant.weight);
      return objVariant.weight;
    } catch (e) {
      console.log('Variants :: getVariantWeight :: error', e);
      throw new Error(e);
    }
  }

  async getVariantPrice(dayOfWeek) {
    try {
      const model = await new StockRule().fetchAll();
      const data = model.toJSON();
      const objVariant = data.find((week) => week.day_of_week === dayOfWeek);
      return objVariant.price;
    } catch (e) {
      console.log('StockRules :: getVariantPrice :: error', e);
      throw new Error(e);
    }
  }

  // //  This part of script is to save data to StockRules table
  static async saveStockRules() {
    try {
      const data = {
        day_of_week: 5,
        value: 7,
        weight: 7,
        price: 7,
        inventory_quantity: 111,
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
// StockRules.saveStockRules();

// const test = new StockRules();
// test.getVariantPrice(7);
