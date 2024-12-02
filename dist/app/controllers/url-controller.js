"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const URLsRepository_1 = __importDefault(require("../repositories/URLsRepository"));
const urlRouter = (0, express_1.Router)();
urlRouter.get('/', async (_req, res) => {
    const urls = await URLsRepository_1.default.getURLs();
    return res.status(200).json(urls);
});
exports.default = urlRouter;
//# sourceMappingURL=url-controller.js.map