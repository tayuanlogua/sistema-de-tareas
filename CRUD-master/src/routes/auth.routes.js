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
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_controller_js_1 = require("../controllers/auth.controller.js");
const valideToken_js_1 = require("../midlewares/valideToken.js");
const validator_midleware_js_1 = require("../midlewares/validator.midleware.js");
const auth_schema_js_1 = require("../schemas/auth.schema.js");
const router = (0, express_1.Router)();
// Endpoint para registrar un nuevo usuario
router.post("/register", (0, validator_midleware_js_1.validateSchema)(auth_schema_js_1.registerSchema), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield (0, auth_controller_js_1.register)(req.body);
        res.status(201).json(user);
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
}));
// Endpoint para iniciar sesión
router.post("/login", (0, validator_midleware_js_1.validateSchema)(auth_schema_js_1.loginSchema), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const token = yield (0, auth_controller_js_1.login)(req.body);
        res.json({ token });
    }
    catch (error) {
        res.status(401).json({ error: error.message });
    }
}));
// Endpoint para cerrar sesión
router.post("/logout", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield (0, auth_controller_js_1.logout)(req);
        res.sendStatus(204);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
}));
// Endpoint para verificar el token de autenticación
router.get("/verify", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield (0, auth_controller_js_1.verifyToken)(req);
        res.json({ valid: result });
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
}));
// Endpoint para obtener el perfil del usuario autenticado
router.get("/profile", valideToken_js_1.authRequired, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userProfile = yield (0, auth_controller_js_1.profile)(req);
        res.json(userProfile);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
}));
exports.default = router;
