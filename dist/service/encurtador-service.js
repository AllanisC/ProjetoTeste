"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const data_source_1 = require("../database/data-source");
const URL_1 = __importDefault(require("../app/entities/URL"));
require("reflect-metadata");
class EncurtadorService {
    async gravar(data) {
        const now = new Date().getTime();
        const { CUSTOM_ALIAS, URL: originalURL } = data;
        const TEMPLATE_URL = "http://shortener/u/";
        const repository = data_source_1.AppDataSource.getRepository(URL_1.default);
        let hash = '';
        if (CUSTOM_ALIAS) {
            const existingURL = await repository.findOneBy({ alias: CUSTOM_ALIAS });
            if (existingURL) {
                throw { ERR_CODE: "001", Description: "CUSTOM ALIAS ALREADY EXISTS" };
            }
            hash = CUSTOM_ALIAS;
        }
        else {
            hash = Math.random().toString(36).slice(2, 8);
        }
        const shortenedURL = `${TEMPLATE_URL}${hash}`;
        const urlEntity = repository.create({
            original_url: originalURL,
            alias: hash,
            shortened_url: shortenedURL,
        });
        await repository.save(urlEntity);
        const after = new Date().getTime();
        const finalTime = `${after - now}ms`;
        return {
            alias: hash,
            url: shortenedURL,
            statistics: {
                time_taken: finalTime,
            }
        };
    }
    async recuperar(alias) {
        const repository = data_source_1.AppDataSource.getRepository(URL_1.default);
        console.log(`Buscando alias: ${alias}`); // Log para depuração
        const urlEntity = await repository.findOneBy({ alias });
        if (!urlEntity) {
            console.log(`Alias não encontrado: ${alias}`); // Log para depuração
            throw { ERR_CODE: "002", Description: "SHORTENED URL NOT FOUND" };
        }
        return urlEntity;
    }
}
exports.default = EncurtadorService;
//# sourceMappingURL=encurtador-service.js.map