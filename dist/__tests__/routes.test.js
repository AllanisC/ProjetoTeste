"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const index_1 = __importDefault(require("../index"));
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
describe('API de Encurtador de URLs', () => {
    test('deve criar uma URL encurtada sem alias personalizado', async () => {
        const response = await (0, supertest_1.default)(index_1.default)
            .post('/')
            .send({ URL: 'http://www.example.com' });
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('alias');
        expect(response.body).toHaveProperty('url');
    });
    test('deve retornar erro se o alias personalizado já existir', async () => {
        const customAlias = 'example';
        await (0, supertest_1.default)(index_1.default)
            .post('/')
            .send({ URL: 'http://www.example.com', CUSTOM_ALIAS: customAlias });
        const response = await (0, supertest_1.default)(index_1.default)
            .post('/')
            .send({ URL: 'http://www.example.com', CUSTOM_ALIAS: customAlias });
        expect(response.status).toBe(400);
        expect(response.body).toEqual({
            ERR_CODE: '001',
            Description: 'CUSTOM ALIAS ALREADY EXISTS',
        });
    });
    test('deve recuperar a URL original', async () => {
        const customAlias = 'example';
        await (0, supertest_1.default)(index_1.default)
            .post('/')
            .send({ URL: 'http://www.example.com', CUSTOM_ALIAS: customAlias });
        const response = await (0, supertest_1.default)(index_1.default).get(`/u/${customAlias}`);
        expect(response.status).toBe(301);
        expect(response.header.location).toBe('http://www.example.com');
    });
    test('deve retornar erro se o alias não existir', async () => {
        const response = await (0, supertest_1.default)(index_1.default).get('/u/nonexisting');
        expect(response.status).toBe(404);
        expect(response.body).toEqual({
            ERR_CODE: '002',
            Description: 'SHORTENED URL NOT FOUND',
        });
    });
});
//# sourceMappingURL=routes.test.js.map