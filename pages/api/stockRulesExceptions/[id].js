
const { StockRuleExceptions } = require('../../../model/stockRules');

export default async (req, res) => {
  const httpMethod = req.method;
  const {
    date, value, weight, price, inventory_quantity,
  } = req.body;

  const model = await new StockRuleExceptions().fetchAll();
  const data = model.toJSON();

  const { id } = req.query;
  // eslint-disable-next-line radix
  const result = data.filter((variant) => variant.id === parseInt(id));

  switch (httpMethod) {
  case 'GET':
    if (result.length > 0) {
      res.status(200).json(result[0]);
    } else {
      res.status(404).json({ message: `Exception variant with id: ${httpMethod} not found` });
    }
    break;

  case 'PUT':
    try {
      // eslint-disable-next-line no-shadow
      const data = {

      };
    } catch (e) {
    }
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
      res.status(200).json(result[0]);
      return model2.save(data, { method: 'insert' });
    } catch (e) {
      console.log(`Failed to post data: ${e}`);
    }
    break;

  case 'DELETE':
    await new StockRuleExceptions(result[0]).destroy();
    res.status(200).json(result[0]);
    break;
  default:
    res.setHeader('Allow', ['GET', 'PUT', 'POST', 'DELETE']);
    res.status(405).end(`Method ${httpMethod} Not Allowed`);
  }
};
