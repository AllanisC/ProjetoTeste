"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const encurtador_service_1 = __importDefault(require("../service/encurtador-service"));
const encurtadorService = new encurtador_service_1.default();
class EncurtadorController {
    async gravar(req, res) {
        try {
            const dataArray = Array.isArray(req.body) ? req.body : [req.body];
            const results = await encurtadorService.gravarMultiplos(dataArray);
            return res.json(results);
        }
        catch (error) {
            return res.status(400).json(error);
        }
    }
    async recuperar(req, res) {
        try {
            const urlEntity = await encurtadorService.recuperar(req.params.alias);
            console.log(`Redirecionando para: ${urlEntity.original_url}`);
            let redirectUrl = urlEntity.original_url;
            if (!/^https?:\/\//i.test(redirectUrl)) {
                redirectUrl = `http://${redirectUrl}`;
            }
            return res.redirect(301, redirectUrl);
        }
        catch (error) {
            return res.status(404).json(error);
        }
    }
    async getTop10Accessed(req, res) {
        try {
            const topUrls = await encurtadorService.getTop10Accessed();
            return res.json(topUrls);
        }
        catch (error) {
            return res.status(500).json({ error: 'Erro ao recuperar as 10 URLs mais acessadas' });
        }
    }
}
exports.default = EncurtadorController;
//# sourceMappingURL=encurtador-controller.js.map