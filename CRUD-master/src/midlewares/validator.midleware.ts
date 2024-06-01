/**
 * Middleware to validate the request body against a schema.
 * @param {Schema<any>} schema - The Yup schema to validate the request body against.
 * @returns {import("express").RequestHandler} Express middleware function.
 */
export const validateSchema =
  (schema: Schema<any>) =>
  (req: Request, res: Response, next: NextFunction) => {
    try {
      // Validate the request body against the provided schema
      schema.validateSync(req.body, { abortEarly: false });
      // If validation is successful, proceed to the next middleware
      next();
    } catch (error: any) {
      // If validation fails, send an error response with the error messages
      return res
        .status(400)
        .json(error.errors.map((error: yup.ValidationError) => error.message));
    }
  };
