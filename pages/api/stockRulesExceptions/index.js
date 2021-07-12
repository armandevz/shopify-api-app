import StockRulesExceptions from '../../../controllers/StockRulesExceptions.ts';

// const StockRulesExceptions = require('../../../controllers/StockRulesExceptions.ts');

export default async (req, res) => {
  const httpMethod = req.method;
  const { date, inventory_quantity } = req.body;

  switch (httpMethod) {
  case 'GET':
    try {
      const getRulesExceptions = await new StockRulesExceptions().getAllStockRulesExceptions();
      res.status(200).json(getRulesExceptions);
    } catch (e) {
      res.status(500).json({ e });
    }
    break;

  case 'POST':
    try {
      const data = {
        date,
        inventory_quantity,
      };
        // eslint-disable-next-line max-len
      const stockRulesExceptions = await new StockRulesExceptions().saveStockRulesExceptions(data);
      res.status(200).json(stockRulesExceptions);
    } catch (error) {
      res.status(500).json({ error });
    }
    break;

  default:
    res.setHeader('Allow', ['GET', 'POST']);
    res.status(405).end(`Method ${httpMethod} Not Allowed`);
  }
};
