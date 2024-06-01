// importamos Router desde express, para acceder a sus metodos
import { Router } from "express";

// importamos los midlewares desde nuestro archi valideToken
import { authRequired } from "../midlewares/valideToken";

// importamos los controladores desde tasks.routes.js
import {
  getTasks,
  getTask,
  createTask,
  updateTask,
  deleteTask,
} from "../controllers/tasks.controllers";

// importamos el comparador
import { validateSchema } from "../midlewares/validator.midleware";
// importamos el esquema con el que comparamos
import { createTaskSchema } from "../schemas/tasks.schemas";

// ----------------------------------

// ejecutamos router y lo almacenamos en una constante
const router = Router();

//

router.get("/tasks", authRequired, getTasks);

router.get("/tasks/:id", authRequired, getTask);

router.post(
  "/tasks",
  authRequired,
  validateSchema(createTaskSchema),
  createTask
);

router.put("/tasks/:id", authRequired, updateTask);

router.delete("/tasks/:id", authRequired, deleteTask);

export default router;
