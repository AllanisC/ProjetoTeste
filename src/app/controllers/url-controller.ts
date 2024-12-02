import { Request, Response, Router } from 'express';
import URL from "src/app/entities/URL";
import URLsRepository from "../repositories/URLsRepository";
import IURLs from 'src/app/interfaces/IURLs';

const urlRouter = Router();

urlRouter.get('/', async (_req: Request, res: Response): Promise<Response> => {
  const urls = await URLsRepository.getURLs();
  return res.status(200).json(urls);
});

export default urlRouter;
