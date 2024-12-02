//import { Router } from 'express';
//import { Encurtador } from '../controllers/encurtador-controller';
//
//const encurtadorController = new Encurtador();
//
//export default (): Router => {
//  const router = Router();
//
//  router.post(`/`, encurtadorController.gravar);
//
//  return router;
//};

import { Router } from 'express';
import EncurtadorController from '../controllers/encurtador-controller'; // Corrigindo a importação

const encurtadorController = new EncurtadorController();

export default (): Router => {
  const router = Router();

  router.post(`/`, (req, res) => encurtadorController.gravar(req, res));
  router.get(`/u/:alias`, (req, res) => encurtadorController.recuperar(req, res));

  return router;
};

