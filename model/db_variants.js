const Variants = require('./variants');

class Db_Variants {
  // The method fetches all data in the DB table
  // eslint-disable-next-line class-methods-use-this
  async fetchAllVariantsDb() {
    try {
      const fetchAll = await new Variants().fetchAll();
      console.log(fetchAll.toJSON());
    } catch (e) {
      console.log(e, 'Something went wrong in => fetchAllVariantsDb()');
    }
  }

  // The method save new data into DB table
  // eslint-disable-next-line class-methods-use-this
  async pushVariantToDb() {
    try {
      const model = await Variants.forge({ title: 'Option1', price: 99.00 });
      await model.save();
      console.log(model.toJSON());
    } catch (e) {
      console.log(e, 'Something went wrong in => pushVariantToDb()');
    }
  }

  // The method fethes certain variant from DB table
  // eslint-disable-next-line class-methods-use-this
  async fetchVariant() {
    try {
      const fetch = await new Variants().where({ title: 'Option2' }).fetch({ require: true });
      console.log(fetch.toJSON());
    } catch (e) {
      console.log(e, 'Something went wrong in => fetchVariant()');
    }
  }
}

module.exports = Db_Variants;
