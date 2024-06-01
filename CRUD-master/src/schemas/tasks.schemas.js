import { z } from "zod";

/**
 * Schema for creating a new task.
 */
export const createTaskSchema = z.object({
  title: z.string({
    required_error: "Title is required",
  }),
  description: z.string({
    required_error: "Description must be a text",
  }),
  date: z.string().datetime().optional(),
});
