const { StockRule } = require('../../../model/stockRules');

export default async (req, res) => {
  const httpMethod = req.method;
  const {
    day_of_week, value, weight, price, inventory_quantity,
  } = req.body;

  switch (httpMethod) {
  case 'GET':
    // eslint-disable-next-line no-case-declarations
    const data1 = await new StockRule().fetchAll();
    // eslint-disable-next-line no-case-declarations
    const data = data1.toJSON();
    res.status(200).json(data);
    break;
  case 'POST':
    try {
      // eslint-disable-next-line no-shadow
      const data = {
        day_of_week,
        value,
        weight,
        price,
        inventory_quantity,
      };
      const model2 = await StockRule.forge();
      res.status(200).json(data);
      return model2.save(data, { method: 'insert' });
    } catch (e) {
      console.log(`Failed to post data: ${e}`);
    }

    break;
  default:
    res.setHeader('Allow', ['GET', 'POST']);
    res.status(405).end(`Method ${httpMethod} Not Allowed`);
  }
};
