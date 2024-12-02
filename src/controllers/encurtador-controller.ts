import { Request, Response } from 'express';
import EncurtadorService from '../service/encurtador-service';

const encurtadorService = new EncurtadorService();

class EncurtadorController {
  async gravar(req: Request, res: Response): Promise<any> {
    try {
      const dataArray = Array.isArray(req.body) ? req.body : [req.body];
      const results = await encurtadorService.gravarMultiplos(dataArray);
      return res.json(results);
    } catch (error) {
      return res.status(400).json(error);
    }
  }

  async recuperar(req: Request, res: Response): Promise<any> {
    try {
      const urlEntity = await encurtadorService.recuperar(req.params.alias);
      console.log(`Redirecionando para: ${urlEntity.original_url}`); // Log para depuração
      let redirectUrl = urlEntity.original_url;

      // Adiciona protocolo 'http://' se não estiver presente na URL original
      if (!/^https?:\/\//i.test(redirectUrl)) {
        redirectUrl = `http://${redirectUrl}`;
      }

      return res.redirect(301, redirectUrl); // Redirecionamento 301 (permanente)
    } catch (error) {
      return res.status(404).json(error);
    }
  }

  async getTop10Accessed(req: Request, res: Response): Promise<any> {
    try {
      const topUrls = await encurtadorService.getTop10Accessed();
      return res.json(topUrls);
    } catch (error) {
      return res.status(500).json({ error: 'Erro ao recuperar as 10 URLs mais acessadas' });
    }
  }
}

export default EncurtadorController;
