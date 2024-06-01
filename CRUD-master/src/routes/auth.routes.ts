import { Router, Request, Response, NextFunction } from "express";
import {
  login,
  logout,
  register,
  profile,
  verifyToken,
} from "../controllers/auth.controller";
import { authRequired } from "../middlewares/validateToken";
import { validateSchema } from "../middlewares/validator.middleware";
import { registerSchema, loginSchema } from "../schemas/auth.schema";

const router = Router();

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

router.post("/logout", async (req: Request, res: Response) => {
  try {
    await logout(req, res);
    res.sendStatus(204);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get("/verify", async (req: Request, res: Response) => {
  try {
    const result = await verifyToken(req, res);
    res.json({ valid: result });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get("/profile", authRequired, async (req: Request, res: Response) => {
  try {
    const userProfile = await profile(req, res);
    res.json(userProfile);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
