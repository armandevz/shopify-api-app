import { IStockRule } from '../../../interfaces/stockRules';
import StockRules from '../../../controllers/StockRules';

export default async (req, res) => {
  const httpMethod = req.method;
  switch (httpMethod) {
    case 'GET':
      try {
        const getRulesData = await new StockRules().getAllStockRules();
        res.status(200).json(getRulesData);
      } catch (error) {}
      break;
    case 'POST':
    case 'PUT':
      try {
        const stockRules = await new StockRules().saveStockRules(req.body);
        res.status(200).json(stockRules);
      } catch (e) {
        res.status(500).json({ e });
      }
      break;
    default:
      res.setHeader('Allow', ['GET', 'POST', 'PUT']);
      res.status(405).end(`Method ${httpMethod} Not Allowed`);
  }
};