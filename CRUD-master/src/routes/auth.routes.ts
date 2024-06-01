import { Router, Request, Response } from "express";
import {
  login,
  logout,
  register,
  profile,
  verifyToken,
} from "../controllers/auth.controller";
import { authRequired } from "../midlewares/valideToken";
import { validateSchema } from "../midlewares/validator.midleware";
import { registerSchema, loginSchema } from "../schemas/auth.schema";

/**
 * Router to handle authentication related endpoints.
 * @type {Router}
 */
const router = Router();

/**
 * Endpoint to register a new user.
 * @name POST /register
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 */
router.post(
  "/register",
  validateSchema(registerSchema),
  async (req: Request, res: Response) => {
    try {
      const user = await register(req.body);
      res.status(201).json(user);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
);

/**
 * Endpoint to login a user.
 * @name POST /login
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 */
router.post(
  "/login",
  validateSchema(loginSchema),
  async (req: Request, res: Response) => {
    try {
      const token = await login(req.body);
      res.json({ token });
    } catch (error) {
      res.status(401).json({ error: error.message });
    }
  }
);

/**
 * Endpoint to logout a user.
 * @name POST /logout
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 */
router.post("/logout", async (req: Request, res: Response) => {
  try {
    await logout(req);
    res.sendStatus(204);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/**
 * Endpoint to verify authentication token.
 * @name GET /verify
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 */
router.get("/verify", async (req: Request, res: Response) => {
  try {
    const result = await verifyToken(req);
    res.json({ valid: result });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/**
 * Endpoint to get the profile of authenticated user.
 * @name GET /profile
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 */
router.get("/profile", authRequired, async (req: Request, res: Response) => {
  try {
    const userProfile = await profile(req);
    res.json(userProfile);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
