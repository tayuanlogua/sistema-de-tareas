"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// importamos Router desde express, para acceder a sus metodos
const express_1 = require("express");
// importamos los midlewares desde nuestro archi valideToken
const valideToken_js_1 = require("../midlewares/valideToken.js");
// importamos los controladores desde tasks.routes.js
const tasks_controllers_js_1 = require("../controllers/tasks.controllers.js");
// importamos el comparador
const validator_midleware_js_1 = require("../midlewares/validator.midleware.js");
// importamos el esquema con el que comparamos
const tasks_schemas_js_1 = require("../schemas/tasks.schemas.js");
// ----------------------------------
// ejecutamos router y lo almacenamos en una constante
const router = (0, express_1.Router)();
//
router.get("/tasks", valideToken_js_1.authRequired, tasks_controllers_js_1.getTasks);
router.get("/tasks/:id", valideToken_js_1.authRequired, tasks_controllers_js_1.getTask);
router.post("/tasks", valideToken_js_1.authRequired, (0, validator_midleware_js_1.validateSchema)(tasks_schemas_js_1.createTaskSchema), tasks_controllers_js_1.createTask);
router.put("/tasks/:id", valideToken_js_1.authRequired, tasks_controllers_js_1.updateTask);
router.delete("/tasks/:id", valideToken_js_1.authRequired, tasks_controllers_js_1.deleteTask);
exports.default = router;
