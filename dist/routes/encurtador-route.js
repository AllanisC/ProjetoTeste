"use strict";
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const encurtador_controller_1 = __importDefault(require("../controllers/encurtador-controller")); // Corrigindo a importação
const encurtadorController = new encurtador_controller_1.default();
exports.default = () => {
    const router = (0, express_1.Router)();
    router.post(`/`, (req, res) => encurtadorController.gravar(req, res));
    router.get(`/u/:alias`, (req, res) => encurtadorController.recuperar(req, res));
    return router;
};
//# sourceMappingURL=encurtador-route.js.map