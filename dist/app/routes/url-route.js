"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const url_controller_1 = __importDefault(require("../controllers/url-controller"));
const routers = (0, express_1.Router)();
routers.use('/urls', url_controller_1.default);
exports.default = routers;
//# sourceMappingURL=url-route.js.map