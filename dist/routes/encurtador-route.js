"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const encurtador_controller_1 = __importDefault(require("../controllers/encurtador-controller"));
const encurtadorController = new encurtador_controller_1.default();
exports.default = () => {
    const router = (0, express_1.Router)();
    router.post(`/`, (req, res) => encurtadorController.gravar(req, res));
    router.get(`/u/:alias`, (req, res) => encurtadorController.recuperar(req, res));
    router.get(`/top10-accessed`, (req, res) => encurtadorController.getTop10Accessed(req, res));
    return router;
};
//# sourceMappingURL=encurtador-route.js.map