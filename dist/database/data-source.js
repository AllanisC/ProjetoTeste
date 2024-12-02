"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppDataSource = void 0;
require("reflect-metadata");
const typeorm_1 = require("typeorm");
const _1733109107157_CreateURLsTable_1 = require("./migrations/1733109107157-CreateURLsTable");
//import URL from "src/app/entities/URL";
const URL_1 = __importDefault(require("../app/entities/URL"));
exports.AppDataSource = new typeorm_1.DataSource({
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "root",
    password: "root",
    database: "encurtador",
    synchronize: true,
    logging: false,
    entities: [URL_1.default],
    migrations: [_1733109107157_CreateURLsTable_1.CreateURLsTable1733109107157],
    subscribers: [],
});
//# sourceMappingURL=data-source.js.map