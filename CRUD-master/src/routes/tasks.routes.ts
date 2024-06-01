import { Router, Request, Response } from "express";
import { authRequired } from "../midlewares/valideToken"; // Corregido el nombre del módulo a "validateToken"
import { validateSchema } from "../midlewares/validator.midleware"; // Corregido el nombre del módulo a "validator.middleware"
import { createTaskSchema } from "../schemas/tasks.schemas";
import {
  createTask,
  updateTask,
  deleteTask,
} from "../controllers/tasks.controllers";

const router = Router();

/**
 * POST method endpoint to create a new task.
 * @name POST /tasks
 * @function
 * @param {Request} req - The request object.
 * @param {Response} res - The response object.
 */
router.post(
  "/tasks",
  authRequired,
  validateSchema(createTaskSchema), // createTaskSchema es un esquema de Zod
  createTask
);

/**
 * PUT method endpoint to update an existing task by ID.
 * @name PUT /tasks/:id
 * @function
 * @param {Request} req - The request object.
 * @param {Response} res - The response object.
 */
router.put("/tasks/:id", authRequired, updateTask);

/**
 * DELETE method endpoint to delete an existing task by ID.
 * @name DELETE /tasks/:id
 * @function
 * @param {Request} req - The request object.
 * @param {Response} res - The response object.
 */
router.delete("/tasks/:id", authRequired, deleteTask);

export default router;
