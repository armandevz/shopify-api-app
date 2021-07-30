import { ICronLog } from '../../../interfaces/cronLog';
import CronLog from '../../../controllers/CronLog';

export default async (req, res) => {
  const httpMethod = req.method;
  switch (httpMethod) {
    case 'GET':
      try {
        const getCronLog = await new CronLog().get();
        res.status(200).json(getCronLog.value);
      } catch (error) {}
      break;
    case 'POST':
    case 'PUT':
      try {
        const cronLog = await new CronLog().save(req.body);
        res.status(200).json(cronLog);
      } catch (e) {
        res.status(500).json({ e });
      }
      break;
    default:
      res.setHeader('Allow', ['GET', 'POST', 'PUT']);
      res.status(405).end(`Method ${httpMethod} Not Allowed`);
  }
};