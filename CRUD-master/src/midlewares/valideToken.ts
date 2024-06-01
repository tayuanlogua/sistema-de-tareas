import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { TOKEN_SECRET } from "../config";

/**
 * Middleware to check if the request contains a valid authentication token.
 * @param {Request} req - The Express request object.
 * @param {Response} res - The Express response object.
 * @param {NextFunction} next - The Express next middleware function.
 * @returns {void}
 */
export const authRequired = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const { token } = req.cookies;

  // Check if token is present in cookies
  if (!token) {
    res.status(401).json({ message: "No token, authorization denied" });
    return;
  }

  // Verify if token is valid
  jwt.verify(token, TOKEN_SECRET, (err: any, user: any) => {
    if (err) {
      res.status(403).json({ message: "Invalid token" });
      return;
    }

    // If token is valid, add the decoded user to the request object (req)
    req.user = user;

    // Call next() to proceed to the next middleware or route
    next();
  });
};
