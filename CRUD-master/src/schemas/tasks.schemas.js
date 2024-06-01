"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createTaskSchema = void 0;
const zod_1 = require("zod");
exports.createTaskSchema = zod_1.z.object({
    title: zod_1.z.string({
        required_error: "El título es obligatorio",
    }),
    description: zod_1.z.string({
        required_error: "La descripción debe ser un texto",
    }),
    date: zod_1.z.string().datetime().optional(),
});
