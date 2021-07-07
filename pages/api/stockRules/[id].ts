
const { StockRule } = require('../../../model/stockRules');

export default async (req, res) => {
  const httpMethod = req.method;
  const {
    day_of_week, value, weight, price, inventory_quantity,
  } = req.body;

  const model = await new StockRule().fetchAll();
  const data = model.toJSON();

  const { id } = req.query;
  // eslint-disable-next-line radix
  const result = data.filter((variant) => variant.id === parseInt(id));

  switch (httpMethod) {
  case 'GET':
    if (result.length > 0) {
      res.status(200).json(result[0]);
    } else {
      res.status(404).json({ message: `Variant with id: ${id} not found` });
    }
    break;

  case 'PUT':
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
      res.status(200).json(result[0]);
      return model2.where({ id: result[0] }).save(data, { method: 'update' });
    } catch (e) {
      console.log(`Failed to update data: ${e}`);
    }
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
      res.status(200).json(result[0]);
      return model2.save(data, { method: 'insert' });
    } catch (e) {
      console.log(`Failed to post data: ${e}`);
    }
    break;

  case 'DELETE':
    await new StockRule(result[0]).destroy();
    res.status(200).json(result[0]);
    break;
  default:
    res.setHeader('Allow', ['GET', 'PUT', 'POST', 'DELETE']);
    res.status(405).end(`Method ${httpMethod} Not Allowed`);
  }
};
