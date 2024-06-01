import { Schema } from "yup"; // Assuming you're using Yup for schema validation

/**
 * Middleware to validate the request body against a schema.
 * @param {Schema<any>} schema - The Yup schema to validate the request body against.
 * @returns {import("express").RequestHandler} Express middleware function.
 */
export const validateSchema = (schema) => (req, res, next) => {
  try {
    // Try to parse the request body according to the provided schema
    schema.parse(req.body);
    // If validation is successful, proceed to the next middleware
    next();
  } catch (error) {
    // If validation fails, send an error response with the error messages
    return res.status(400).json(error.errors.map((error) => error.message));
  }
};
