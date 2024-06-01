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
exports.updateTask = exports.deleteTask = exports.getTask = exports.createTask = exports.getTasks = void 0;
const tasks_model_js_1 = __importDefault(require("../models/tasks.model.js"));
const getTasks = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const tasks = yield tasks_model_js_1.default.find({
            user: req.user.id,
        }).populate("user");
        res.json(tasks);
    }
    catch (error) {
        return res.status(500).json({ message: "Something went wrong" });
    }
});
exports.getTasks = getTasks;
const createTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { title, description, date } = req.body;
        const newTask = new tasks_model_js_1.default({
            title,
            description,
            date,
            user: req.user.id,
        });
        const savedTask = yield newTask.save();
        res.json(savedTask);
    }
    catch (error) {
        return res.status(500).json({ message: "Something went wrong" });
    }
});
exports.createTask = createTask;
const getTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const task = yield tasks_model_js_1.default.findById(req.params.id).populate("user");
        if (!task)
            return res.status(404).json({ message: "Tarea no encontrada" });
        return res.json(task);
    }
    catch (error) {
        return res.status(404).json({ message: "Tarea no encontrada" });
    }
});
exports.getTask = getTask;
const deleteTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const task = yield tasks_model_js_1.default.findByIdAndDelete(req.params.id);
        if (!task)
            return res.status(404).json({ message: "Tarea no encontrada" });
        return res.sendStatus(204);
    }
    catch (error) {
        return res.status(404).json({ message: "Tarea no encontrada" });
    }
});
exports.deleteTask = deleteTask;
const updateTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const task = yield tasks_model_js_1.default.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
        });
        if (!task)
            return res.status(404).json({ message: "Tarea no encontrada" });
        res.json(task);
    }
    catch (error) {
        return res.status(404).json({ message: "Tarea no encontrada" });
    }
});
exports.updateTask = updateTask;
