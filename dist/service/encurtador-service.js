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
        var now = new Date().getTime();
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
        console.log('Criando URL com:', { originalURL, alias: hash, shortenedURL });
        const urlEntity = repository.create({
            original_url: originalURL,
            alias: hash,
            shortened_url: shortenedURL,
            access_count: 0
        });
        await repository.save(urlEntity);
        var after = new Date().getTime();
        var finalTime = `${after - now}ms`;
        return {
            alias: hash,
            url: shortenedURL,
            statistics: {
                time_taken: finalTime,
            }
        };
    }
    async gravarMultiplos(dados) {
        const results = [];
        for (const data of dados) {
            const result = await this.gravar(data);
            results.push(result);
        }
        return results;
    }
    async recuperar(alias) {
        const repository = data_source_1.AppDataSource.getRepository(URL_1.default);
        console.log(`Buscando alias: ${alias}`);
        const urlEntity = await repository.findOneBy({ alias });
        if (!urlEntity) {
            console.log(`Alias não encontrado: ${alias}`);
            throw { ERR_CODE: "002", Description: "SHORTENED URL NOT FOUND" };
        }
        urlEntity.access_count += 1;
        await repository.save(urlEntity);
        return urlEntity;
    }
    async getTop10Accessed() {
        const repository = data_source_1.AppDataSource.getRepository(URL_1.default);
        const topUrls = await repository.find({
            order: {
                access_count: 'DESC'
            },
            take: 10
        });
        return topUrls;
    }
}
exports.default = EncurtadorService;
//# sourceMappingURL=encurtador-service.js.map