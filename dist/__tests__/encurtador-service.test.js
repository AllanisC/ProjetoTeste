"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const encurtador_service_1 = __importDefault(require("../service/encurtador-service"));
const data_source_1 = require("../database/data-source");
const URL_1 = __importDefault(require("../app/entities/URL"));
beforeAll(async () => {
    await data_source_1.AppDataSource.initialize();
});
beforeEach(async () => {
    const repository = data_source_1.AppDataSource.getRepository(URL_1.default);
    await repository.clear();
});
afterAll(async () => {
    await data_source_1.AppDataSource.destroy();
});
describe('EncurtadorService', () => {
    const encurtadorService = new encurtador_service_1.default();
    test('deve criar uma URL encurtada sem alias personalizado', async () => {
        const data = { URL: 'http://www.example.com' };
        const result = await encurtadorService.gravar(data);
        expect(result).toHaveProperty('alias');
        expect(result).toHaveProperty('url');
        expect(result.url).toMatch(/http:\/\/shortener\/u\//);
    });
    test('deve recuperar a URL original', async () => {
        const alias = 'example';
        const data = { URL: 'http://www.example.com', CUSTOM_ALIAS: alias };
        await encurtadorService.gravar(data);
        const result = await encurtadorService.recuperar(alias);
        expect(result).toHaveProperty('original_url', 'http://www.example.com');
    });
    test('deve retornar erro se o alias personalizado já existir', async () => {
        const data = { URL: 'http://www.example.com', CUSTOM_ALIAS: 'example' };
        await encurtadorService.gravar(data);
        await expect(encurtadorService.gravar(data)).rejects.toEqual({
            ERR_CODE: '001',
            Description: 'CUSTOM ALIAS ALREADY EXISTS',
        });
    });
    test('deve retornar erro se o alias não existir', async () => {
        const alias = 'nonexisting';
        await expect(encurtadorService.recuperar(alias)).rejects.toEqual({
            ERR_CODE: '002',
            Description: 'SHORTENED URL NOT FOUND',
        });
    });
});
//# sourceMappingURL=encurtador-service.test.js.map