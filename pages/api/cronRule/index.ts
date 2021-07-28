import { IConfig } from '../../../interfaces/config';
import Config from '../../../controllers/Config';

export default async (req, res) => {
  const httpMethod = req.method;
  switch (httpMethod) {
    case 'GET':
      try {
        const getRulesData = await new Config().get();
        res.status(200).json(getRulesData);
      } catch (error) {}
      break;
    case 'POST':
    case 'PUT':
      try {
        const cronRule = await new Config().save(req.body);
        res.status(200).json(cronRule);
      } catch (e) {
        res.status(500).json({ e });
      }
      break;
    default:
      res.setHeader('Allow', ['GET', 'POST', 'PUT']);
      res.status(405).end(`Method ${httpMethod} Not Allowed`);
  }
};