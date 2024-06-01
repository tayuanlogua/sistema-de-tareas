"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authRequired = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_js_1 = require("../config.js");
const authRequired = (req, res, next) => {
    const { token } = req.cookies;
    // Verificamos si el token está presente en las cookies
    if (!token)
        return res.status(401).json({ message: "No token, authorization denied" });
    // Verificamos si el token es válido
    jsonwebtoken_1.default.verify(token, config_js_1.TOKEN_SECRET, (err, user) => {
        if (err)
            return res.status(403).json({ message: "Invalid token" });
        // Si el token es válido, agregamos el usuario decodificado al objeto de solicitud (req)
        req.user = user;
        // Llamamos a next() para pasar al siguiente middleware o ruta
        next();
    });
};
exports.authRequired = authRequired;
