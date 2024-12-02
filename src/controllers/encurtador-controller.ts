import { Request, Response } from 'express';
import EncurtadorService from '../service/encurtador-service';

const encurtadorService = new EncurtadorService();

class EncurtadorController {
  async gravar(req: Request, res: Response): Promise<any> {
    try {
      const result = await encurtadorService.gravar(req.body);
      return res.json(result);
    } catch (error) {
      return res.status(400).json(error);
    }
  }

  async recuperar(req: Request, res: Response): Promise<any> {
    try {
      const urlEntity = await encurtadorService.recuperar(req.params.alias);
      console.log(`Redirecionando para: ${urlEntity.original_url}`); // Log para depuração
      return res.redirect(301, `https://${urlEntity.original_url}`); // Usar redirecionamento 301 (permanente) e garantir que a URL original tenha o protocolo correto
    } catch (error) {
      return res.status(404).json(error);
    }
  }  
}

export default EncurtadorController;
