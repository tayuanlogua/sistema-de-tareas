"use strict";
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
exports.authRequired = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_js_1 = require("../config.js");

/**
 * Middleware to check if the request contains a valid authentication token.
 * @param {Request} req - The Express request object.
 * @param {Response} res - The Express response object.
 * @param {NextFunction} next - The Express next middleware function.
 * @returns {void}
 */
const authRequired = (req, res, next) => {
  const { token } = req.cookies;
  // Check if token is present in cookies
  if (!token)
    return res.status(401).json({ message: "No token, authorization denied" });
  // Verify if token is valid
  jsonwebtoken_1.default.verify(
    token,
    config_js_1.TOKEN_SECRET,
    (err, user) => {
      if (err) return res.status(403).json({ message: "Invalid token" });
      // If token is valid, add the decoded user to the request object (req)
      req.user = user;
      // Call next() to proceed to the next middleware or route
      next();
    }
  );
};

exports.authRequired = authRequired;
