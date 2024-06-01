import { Request, Response } from "express";
import Task from "../models/tasks.model";

// Extend the Express Request interface to include the user property
declare module "express-serve-static-core" {
  interface Request {
    user?: { id: string }; // Adjust the type according to your needs
  }
}

/**
 * Get all tasks for the authenticated user.
 * @param {Request} req - Request object.
 * @param {Response} res - Response object.
 */
export const getTasks = async (req: Request, res: Response) => {
  try {
    const tasks = await Task.find({
      user: req.user?.id,
    }).populate("user");
    res.json(tasks);
  } catch (error) {
    return res.status(500).json({ message: "Something went wrong" });
  }
};

/**
 * Create a new task for the authenticated user.
 * @param {Request} req - Request object.
 * @param {Response} res - Response object.
 */
export const createTask = async (req: Request, res: Response) => {
  try {
    const { title, description, dueDate, status } = req.body;
    const newTask = new Task({
      title,
      description,
      dueDate,
      status,
      user: req.user?.id,
    });
    const savedTask = await newTask.save();
    res.json(savedTask);
  } catch (error) {
    return res.status(500).json({ message: "Something went wrong" });
  }
};

/**
 * Get a specific task by its ID.
 * @param {Request} req - Request object.
 * @param {Response} res - Response object.
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
 * Delete a specific task by its ID.
 * @param {Request} req - Request object.
 * @param {Response} res - Response object.
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
 * Update a specific task by its ID.
 * @param {Request} req - Request object.
 * @param {Response} res - Response object.
 */
export const updateTask = async (req: Request, res: Response) => {
  try {
    const { title, description, dueDate, status } = req.body;
    const updatedTask = await Task.findByIdAndUpdate(
      req.params.id,
      { title, description, dueDate, status },
      { new: true }
    );
    if (!updatedTask)
      return res.status(404).json({ message: "Task not found" });
    res.json(updatedTask);
  } catch (error) {
    return res.status(404).json({ message: "Task not found" });
  }
};
