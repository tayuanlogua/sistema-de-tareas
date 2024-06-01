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
exports.verifyToken = exports.profile = exports.logout = exports.login = exports.register = void 0;
const user_model_js_1 = __importDefault(require("../models/user.model.js"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jwt_js_1 = require("../libs/jwt.js");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_js_1 = require("../config.js");
// Registro de usuario
const register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, email, password } = req.body;
    try {
        // Validar si el usuario ya existe
        const userFound = yield user_model_js_1.default.findOne({ email });
        if (userFound)
            return res.status(400).json(["The email is already in use"]);
        // Encriptar la contraseña
        const passwordHash = yield bcryptjs_1.default.hash(password, 10);
        // Crear nuevo usuario
        const newUser = new user_model_js_1.default({
            username,
            email,
            password: passwordHash,
        });
        // Guardar el usuario en la base de datos
        const userSaved = yield newUser.save();
        // Crear token de acceso
        const token = yield (0, jwt_js_1.createAccessToken)({ id: userSaved._id });
        res.cookie("token", token);
        // Responder con la información del usuario para el frontend
        res.json({
            id: userSaved._id,
            username: userSaved.username,
            email: userSaved.email,
            createdAt: userSaved.createdAt,
            updatedAt: userSaved.updatedAt,
        });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});
exports.register = register;
// Iniciar sesión de usuario
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { password, email } = req.body;
    try {
        // Buscar si el usuario existe
        const userFound = yield user_model_js_1.default.findOne({ email });
        if (!userFound)
            return res.status(400).json({ message: "User not found" });
        // Comparar la contraseña
        const isMatch = yield bcryptjs_1.default.compare(password, userFound.password);
        if (!isMatch)
            return res.status(400).json({ message: "Incorrect password" });
        // Crear token de acceso
        const token = yield (0, jwt_js_1.createAccessToken)({ id: userFound._id });
        res.cookie("token", token);
        // Responder con la información del usuario para el frontend
        res.json({
            id: userFound._id,
            username: userFound.username,
            email: userFound.email,
            createdAt: userFound.createdAt,
            updatedAt: userFound.updatedAt,
        });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});
exports.login = login;
// Cerrar sesión de usuario
const logout = (req, res) => {
    res.cookie("token", "", {
        expires: new Date(0),
    });
    return res.sendStatus(200);
};
exports.logout = logout;
// Perfil de usuario
const profile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userFound = yield user_model_js_1.default.findById(req.user.id);
    if (!userFound)
        return res.status(400).json({ message: "User not found" });
    return res.json({
        id: userFound.id,
        username: userFound.username,
        email: userFound.email,
        createdAt: userFound.createdAt,
        updatedAt: userFound.updatedAt,
    });
});
exports.profile = profile;
// Verificar token
const verifyToken = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { token } = req.cookies;
    if (!token)
        return res.status(401).json({ message: "Unauthorized" });
    jsonwebtoken_1.default.verify(token, config_js_1.TOKEN_SECRET, (err, user) => __awaiter(void 0, void 0, void 0, function* () {
        if (err)
            return res.status(401).json({ message: "Unauthorized" });
        const userFound = yield user_model_js_1.default.findById(user.id);
        if (!userFound)
            return res.status(401).json({ message: "Unauthorized" });
        return res.json({
            id: userFound._id,
            username: userFound.username,
            email: userFound.email,
        });
    }));
});
exports.verifyToken = verifyToken;
