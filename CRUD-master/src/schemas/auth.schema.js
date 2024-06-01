"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginSchema = exports.registerSchema = void 0;
const zod_1 = require("zod");
exports.registerSchema = zod_1.z.object({
    username: zod_1.z.string({
        required_error: "El nombre de usuario es obligatorio",
    }),
    email: zod_1.z
        .string({
        required_error: "El correo electrónico es obligatorio",
    })
        .email({
        message: "Correo electrónico inválido",
    }),
    password: zod_1.z
        .string({
        required_error: "La contraseña es obligatoria",
    })
        .min(6, {
        message: "La contraseña debe tener al menos 6 caracteres",
    }),
});
exports.loginSchema = zod_1.z.object({
    email: zod_1.z
        .string({
        required_error: "El correo electrónico es obligatorio",
    })
        .email({
        message: "Correo electrónico inválido",
    }),
    password: zod_1.z
        .string({
        required_error: "La contraseña es obligatoria",
    })
        .min(6, {
        message: "La contraseña debe tener al menos 6 caracteres",
    }),
});
