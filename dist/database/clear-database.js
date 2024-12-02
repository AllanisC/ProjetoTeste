"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const data_source_1 = require("./data-source");
const URL_1 = __importDefault(require("../app/entities/URL"));
async function clearDatabase() {
    await data_source_1.AppDataSource.initialize();
    const repository = data_source_1.AppDataSource.getRepository(URL_1.default);
    await repository.clear();
    console.log('Banco de dados limpo antes da compilação');
    await data_source_1.AppDataSource.destroy();
}
clearDatabase().then(() => console.log('Banco de dados limpo'));
//# sourceMappingURL=clear-database.js.map