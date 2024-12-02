"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("express-async-errors");
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const morgan_1 = __importDefault(require("morgan"));
const encurtador_route_1 = __importDefault(require("./routes/encurtador-route"));
//import urlRoutes from 'src/app/routes/url-route';
const url_route_1 = __importDefault(require("./app/routes/url-route"));
const app = (0, express_1.default)();
app.use((0, morgan_1.default)('tiny'));
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use((0, encurtador_route_1.default)());
app.use(url_route_1.default);
app.use((error, req, res, next) => {
    res.status(500).send(error.message);
});
exports.default = app;
//# sourceMappingURL=index.js.map