"use strict";

import { Router, Request, Response } from "express";
import {
  register,
  login,
  logout,
  verifyToken,
  profile,
} from "../controllers/auth.controller.js";
import { authRequired } from "../middlewares/validateToken.js";
import { validateSchema } from "../middlewares/validator.middleware.js";
import { registerSchema, loginSchema } from "../schemas/auth.schema.js";

const router = Router();

/**
 * Endpoint to register a new user.
 * @param {Request} req - The request object.
 * @param {Response} res - The response object.
 */
router.post("/register", validateSchema(registerSchema), async (req, res) => {
  try {
    const user = await register(req.body);
    res.status(201).json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

/**
 * Endpoint to login.
 * @param {Request} req - The request object.
 * @param {Response} res - The response object.
 */
router.post("/login", validateSchema(loginSchema), async (req, res) => {
  try {
    const token = await login(req.body);
    res.json({ token });
  } catch (error) {
    res.status(401).json({ error: error.message });
  }
});

/**
 * Endpoint to logout.
 * @param {Request} req - The request object.
 * @param {Response} res - The response object.
 */
router.post("/logout", async (req, res) => {
  try {
    await logout(req);
    res.sendStatus(204);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/**
 * Endpoint to verify authentication token.
 * @param {Request} req - The request object.
 * @param {Response} res - The response object.
 */
router.get("/verify", async (req, res) => {
  try {
    const result = await verifyToken(req);
    res.json({ valid: result });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/**
 * Endpoint to get authenticated user's profile.
 * @param {Request} req - The request object.
 * @param {Response} res - The response object.
 */
router.get("/profile", authRequired, async (req, res) => {
  try {
    const userProfile = await profile(req);
    res.json(userProfile);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
