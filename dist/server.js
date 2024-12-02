"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
require("reflect-metadata");
const data_source_1 = require("./database/data-source");
const index_1 = __importDefault(require("./index"));
const PORT = parseInt(`${process.env.PORT || 3000}`);
dotenv_1.default.config();
data_source_1.AppDataSource.initialize().then(async () => {
    console.log('Database OK');
    index_1.default.listen(PORT, () => console.log(`Server is running at ${PORT}.`));
});
//# sourceMappingURL=server.js.map