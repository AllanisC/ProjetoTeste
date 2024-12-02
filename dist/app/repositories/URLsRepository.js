"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const URL_1 = __importDefault(require("../entities/URL"));
//import { AppDataSource } from "src/database/data-source";
const data_source_1 = require("../../database/data-source");
const URLsRepository = data_source_1.AppDataSource.getRepository(URL_1.default);
const getURLs = () => {
    return URLsRepository.find(); //select * from
};
exports.default = { getURLs };
//# sourceMappingURL=URLsRepository.js.map