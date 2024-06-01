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
exports.connectDB = void 0;
// importamos mongoose, para poder acceder a sus metodos
const mongoose_1 = __importDefault(require("mongoose"));
// Función para conectar a la base de datos
const connectDB = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // URL de conexión a la base de datos desde una variable de entorno
        const dbURI = process.env.MONGODB_URI;
        // Opciones de configuración de la conexión
        const options = {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            // Otras opciones según sea necesario
        };
        // Conexión a la base de datos
        yield mongoose_1.default.connect(dbURI, options);
        console.log("Conectado a la base de datos MongoDB");
    }
    catch (error) {
        // Manejo de errores
        console.error("Error al conectar a la base de datos:", error);
        throw error; // Lanzar el error para que sea manejado por la aplicación
    }
});
exports.connectDB = connectDB;
