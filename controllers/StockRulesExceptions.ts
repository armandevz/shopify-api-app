import { IStockRuleExceptions } from '../interfaces/stockRules';
const { StockRuleExceptions } = require('../model/stockRules');

class StockRulesExceptions {
  // Function must be checked. Changes has been aplied
  async getStockRulesExceptions(
    date: Date
  ): Promise<IStockRuleExceptions | null> {
    try {
      const model = await new StockRuleExceptions().where({ date }).fetch({
        require: false,
      });
      return model ? model.toJSON() : null;
    } catch (e) {
      console.log('Variants :: getStockRulesExceptions :: error', e);
      throw new Error(e);
    }
  }

  async getAllStockRulesExceptions(): Promise<IStockRuleExceptions | null> {
    try {
      const model = await new StockRuleExceptions().fetchAll();
      return model.toJSON();
    } catch (e) {
      console.log(
        'StockRulesExceptions :: getAllStockRulesExceptions :: error',
        e
      );
      throw new Error(e);
    }
  }

  async saveStockRulesExceptions(
    data: IStockRuleExceptions
  ): Promise<IStockRuleExceptions> {
    try {
      // const existingData = await this.getStockRulesExceptions(data.date);
      const existingData = await new StockRuleExceptions()
        .where({ date: data.date })
        .fetch({
          require: false,
        });
      // This part to update data
      if (!existingData) {
        const model = await StockRuleExceptions.forge();
        return model.save(data, { method: 'insert' });
      } else {
        existingData.save(data, { method: 'update' });
        return null;
      }
    } catch (e) {
      console.log(`Failed to save data: ${e}`);
    }
  }

  static async deleteStockRulesExceptions(id): Promise<boolean> {
    try {
      await new StockRuleExceptions({ id }).destroy();
      return true;
    } catch (e) {
      console.log(`Failed to delete data: ${e}`);
      throw new Error(e);
    }
  }
}

module.exports = StockRulesExceptions;
