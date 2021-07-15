import { IStockRule } from '../../../interfaces/stockRules';
import StockRules from '../../../controllers/StockRules';

export default async (req, res) => {
  const httpMethod = req.method;
  const { days } = req.body as { days: IStockRule[] };
  // const { day_of_week, weight, price, inventory_quantity } = req.body;

  switch (httpMethod) {
    case 'GET':
      try {
        const getRulesData = await new StockRules().getAllStockRules();
        res.status(200).json(getRulesData);
      } catch (error) {}
      break;
    case 'POST':
      try {
        // const data = {
        //   day_of_week,
        //   weight,
        //   price,
        //   inventory_quantity,
        // };
        const stockRules = await new StockRules().saveStockRules(days);
        res.status(200).json(stockRules);
      } catch (e) {
        res.status(500).json({ e });
      }

      break;
    default:
      res.setHeader('Allow', ['GET', 'POST']);
      res.status(405).end(`Method ${httpMethod} Not Allowed`);
  }
};
