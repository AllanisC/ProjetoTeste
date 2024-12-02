import { Router } from 'express';
import EncurtadorController from '../controllers/encurtador-controller';

const encurtadorController = new EncurtadorController();

export default (): Router => {
  const router = Router();

  router.post(`/`, (req, res) => encurtadorController.gravar(req, res));
  router.get(`/u/:alias`, (req, res) => encurtadorController.recuperar(req, res));
  router.get(`/top10-accessed`, (req, res) => encurtadorController.getTop10Accessed(req, res));

  return router;
};
