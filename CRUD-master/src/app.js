"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const cors_1 = __importDefault(require("cors"));
const auth_routes_js_1 = __importDefault(require("./routes/auth.routes.js"));
const tasks_routes_js_1 = __importDefault(require("./routes/tasks.routes.js"));
const app = (0, express_1.default)();
// Configuración de seguridad para cookies
app.use((0, cookie_parser_1.default)({
    sameSite: "strict",
    httpOnly: true,
}));
// Configuración de CORS
app.use((0, cors_1.default)({
    origin: "http://localhost:5173",
    credentials: true,
}));
// Middleware de registro de solicitudes
app.use((0, morgan_1.default)("dev"));
// Middleware para analizar el cuerpo de las solicitudes HTTP
app.use(express_1.default.json());
// Middleware para manejar errores
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send("Error interno del servidor");
});
// Consumo de las rutas
app.use("/api", auth_routes_js_1.default);
app.use("/api", tasks_routes_js_1.default);
exports.default = app;
