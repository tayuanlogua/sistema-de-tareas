"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
// Definición del esquema de tarea
const taskSchema = new mongoose_1.default.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        default: Date.now,
    },
    user: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "User", // Referencia al modelo de usuario
        required: true,
    },
}, {
    timestamps: true, // Agrega campos de createdAt y updatedAt automáticamente
});
// Compilación del modelo de tarea
const Task = mongoose_1.default.model("Task", taskSchema);
exports.default = Task;
