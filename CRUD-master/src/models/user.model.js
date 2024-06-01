"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
// Definición del esquema de usuario
const userSchema = new mongoose_1.default.Schema({
    username: {
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true, // Garantiza que cada correo electrónico sea único en la base de datos
    },
    password: {
        type: String,
        required: true,
    },
}, {
    timestamps: true, // Agrega campos de createdAt y updatedAt automáticamente
});
// Compilación del modelo de usuario
const User = mongoose_1.default.model("User", userSchema);
exports.default = User;
