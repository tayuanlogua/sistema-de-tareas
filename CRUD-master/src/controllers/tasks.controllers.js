"use strict";
import { Request, Response } from "express";
import Task from "../models/tasks.model.js";

/**
 * @swagger
 * components:
 *   schemas:
 *     Task:
 *       type: object
 *       required:
 *         - title
 *         - description
 *         - date
 *         - user
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated id of the task
 *         title:
 *           type: string
 *           description: The title of the task
 *         description:
 *           type: string
 *           description: The description of the task
 *         date:
 *           type: string
 *           format: date-time
 *           description: The due date of the task
 *         user:
 *           type: string
 *           description: The user id associated with the task
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: The creation date of the task
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: The last update date of the task
 *       example:
 *         id: d5fE_asz
 *         title: "Buy groceries"
 *         description: "Milk, Bread, Cheese"
 *         date: "2023-06-01T00:00:00.000Z"
 *         user: "user_id"
 *         createdAt: "2023-06-01T00:00:00.000Z"
 *         updatedAt: "2023-06-01T00:00:00.000Z"
 */

/**
 * @swagger
 * tags:
 *   name: Tasks
 *   description: The tasks managing API
 */

/**
 * @swagger
 * /tasks:
 *   get:
 *     summary: Retrieves all tasks of the authenticated user
 *     tags: [Tasks]
 *     responses:
 *       200:
 *         description: A list of tasks
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Task'
 *       500:
 *         description: Something went wrong
 */
export const getTasks = async (req: Request, res: Response) => {
  try {
    const tasks = await Task.find({
      user: req.user.id,
    }).populate("user");
    res.json(tasks);
  } catch (error) {
    return res.status(500).json({ message: "Something went wrong" });
  }
};

/**
 * @swagger
 * /tasks:
 *   post:
 *     summary: Creates a new task for the authenticated user
 *     tags: [Tasks]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Task'
 *     responses:
 *       201:
 *         description: The task was successfully created
 *       500:
 *         description: Something went wrong
 */
export const createTask = async (req: Request, res: Response) => {
  try {
    const { title, description, date } = req.body;
    const newTask = new Task({
      title,
      description,
      date,
      user: req.user.id,
    });
    const savedTask = await newTask.save();
    res.status(201).json(savedTask);
  } catch (error) {
    return res.status(500).json({ message: "Something went wrong" });
  }
};

/**
 * @swagger
 * /tasks/{id}:
 *   get:
 *     summary: Retrieves a specific task by its ID
 *     tags: [Tasks]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The task ID
 *     responses:
 *       200:
 *         description: The task was successfully retrieved
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Task'
 *       404:
 *         description: Task not found
 */
export const getTask = async (req: Request, res: Response) => {
  try {
    const task = await Task.findById(req.params.id).populate("user");
    if (!task) return res.status(404).json({ message: "Task not found" });
    return res.json(task);
  } catch (error) {
    return res.status(404).json({ message: "Task not found" });
  }
};

/**
 * @swagger
 * /tasks/{id}:
 *   delete:
 *     summary: Deletes a specific task by its ID
 *     tags: [Tasks]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The task ID
 *     responses:
 *       204:
 *         description: The task was successfully deleted
 *       404:
 *         description: Task not found
 */
export const deleteTask = async (req: Request, res: Response) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.id);
    if (!task) return res.status(404).json({ message: "Task not found" });
    return res.sendStatus(204);
  } catch (error) {
    return res.status(404).json({ message: "Task not found" });
  }
};

/**
 * @swagger
 * /tasks/{id}:
 *   put:
 *     summary: Updates a specific task by its ID
 *     tags: [Tasks]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The task ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Task'
 *     responses:
 *       200:
 *         description: The task was successfully updated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Task'
 *       404:
 *         description: Task not found
 */
export const updateTask = async (req: Request, res: Response) => {
  try {
    const task = await Task.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!task) return res.status(404).json({ message: "Task not found" });
    res.json(task);
  } catch (error) {
    return res.status(404).json({ message: "Task not found" });
  }
};
