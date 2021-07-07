const { StockRuleExceptions } = require('../../../model/stockRules');

export default async (req, res) => {
  const httpMethod = req.method;
  const {
    date, value, weight, price, inventory_quantity,
  } = req.body;

  switch (httpMethod) {
  case 'GET':
    // eslint-disable-next-line no-case-declarations
    const data1 = await new StockRuleExceptions().fetchAll();
    // eslint-disable-next-line no-case-declarations
    const data = data1.toJSON();
    res.status(200).json(data);
    break;
  case 'POST':
    try {
      // eslint-disable-next-line no-shadow
      const data = {
        date,
        value,
        weight,
        price,
        inventory_quantity,
      };
      const model2 = await StockRuleExceptions.forge();
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
