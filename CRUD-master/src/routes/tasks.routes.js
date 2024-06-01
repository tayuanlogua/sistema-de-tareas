"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Import Router from express to access its methods
const express_1 = require("express");
// Import middlewares from valideToken.js file
const valideToken_js_1 = require("../middlewares/valideToken.js");
// Import controllers from tasks.controllers.js
const tasks_controllers_js_1 = require("../controllers/tasks.controllers.js");
// Import validator
const validator_middleware_js_1 = require("../middlewares/validator.middleware.js");
// Import schema for comparison
const tasks_schemas_js_1 = require("../schemas/tasks.schemas.js");

// Initialize router and store it in a constant
const router = express_1.Router();

/**
 * GET method endpoint to retrieve all tasks.
 * @name GET /tasks
 * @function
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 */
router.get(
  "/tasks",
  valideToken_js_1.authRequired,
  tasks_controllers_js_1.getTasks
);

/**
 * GET method endpoint to retrieve a specific task by ID.
 * @name GET /tasks/:id
 * @function
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 */
router.get(
  "/tasks/:id",
  valideToken_js_1.authRequired,
  tasks_controllers_js_1.getTask
);

/**
 * POST method endpoint to create a new task.
 * @name POST /tasks
 * @function
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 */
router.post(
  "/tasks",
  valideToken_js_1.authRequired,
  validator_middleware_js_1.validateSchema(tasks_schemas_js_1.createTaskSchema),
  tasks_controllers_js_1.createTask
);

/**
 * PUT method endpoint to update an existing task by ID.
 * @name PUT /tasks/:id
 * @function
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 */
router.put(
  "/tasks/:id",
  valideToken_js_1.authRequired,
  tasks_controllers_js_1.updateTask
);

/**
 * DELETE method endpoint to delete an existing task by ID.
 * @name DELETE /tasks/:id
 * @function
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 */
router.delete(
  "/tasks/:id",
  valideToken_js_1.authRequired,
  tasks_controllers_js_1.deleteTask
);

exports.default = router;
