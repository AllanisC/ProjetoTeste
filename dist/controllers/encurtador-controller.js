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
            const result = await encurtadorService.gravar(req.body);
            return res.json(result);
        }
        catch (error) {
            return res.status(400).json(error);
        }
    }
    async recuperar(req, res) {
        try {
            const urlEntity = await encurtadorService.recuperar(req.params.alias);
            console.log(`Redirecionando para: ${urlEntity.original_url}`); // Log para depuração
            return res.redirect(301, `https://${urlEntity.original_url}`); // Usar redirecionamento 301 (permanente) e garantir que a URL original tenha o protocolo correto
        }
        catch (error) {
            return res.status(404).json(error);
        }
    }
}
exports.default = EncurtadorController;
//# sourceMappingURL=encurtador-controller.js.map