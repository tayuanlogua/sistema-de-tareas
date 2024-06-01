import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { TOKEN_SECRET } from "../config";

/**
 * Middleware to check if a valid JWT token is provided in the request.
 * @param {Request} req - The request object.
 * @param {Response} res - The response object.
 * @param {NextFunction} next - The next middleware function.
 */
export const authRequired = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const { token } = req.cookies;

  if (!token) {
    res.status(401).json({ error: "No token provided" });
    return; // End the function execution after sending the response
  }

  jwt.verify(
    token,
    TOKEN_SECRET,
    (err: jwt.VerifyErrors | null, decoded: any) => {
      if (err) {
        if (err.name === "TokenExpiredError") {
          res.status(401).json({ error: "Token expired" });
        } else {
          res.status(401).json({ error: "Invalid token" });
        }
        return; // End the function execution after sending the response
      }

      req.user = decoded;
      next(); // Continue with the next middleware or route handler
    }
  );
};
