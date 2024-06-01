"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_js_1 = __importDefault(require("./app.js"));
const db_js_1 = require("./db.js");
// Puerto del servidor
const PORT = process.env.PORT || 3000;
// Iniciando el servidor y conectando a la base de datos
const startServer = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Iniciando la aplicación Express
        const server = app_js_1.default.listen(PORT, () => {
            console.log(`Servidor en ejecución en http://localhost:${PORT}`);
        });
        // Conectando a la base de datos
        yield (0, db_js_1.connectDB)();
        // Manejo de cierre del servidor
        process.on("SIGINT", () => {
            server.close(() => {
                console.log("Servidor cerrado correctamente");
                process.exit(0);
            });
        });
    }
    catch (error) {
        console.error("Error al iniciar el servidor:", error);
        process.exit(1); // Salir con código de error
    }
});
// Iniciar el servidor
startServer();
