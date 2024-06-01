import { Router } from "express";
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

const router = Router();

// Endpoint para registrar un nuevo usuario
router.post("/register", validateSchema(registerSchema), async (req, res) => {
  try {
    const user = await register(req.body);
    res.status(201).json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Endpoint para iniciar sesión
router.post("/login", validateSchema(loginSchema), async (req, res) => {
  try {
    const token = await login(req.body);
    res.json({ token });
  } catch (error) {
    res.status(401).json({ error: error.message });
  }
});

// Endpoint para cerrar sesión
router.post("/logout", async (req, res) => {
  try {
    await logout(req);
    res.sendStatus(204);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Endpoint para verificar el token de autenticación
router.get("/verify", async (req, res) => {
  try {
    const result = await verifyToken(req);
    res.json({ valid: result });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Endpoint para obtener el perfil del usuario autenticado
router.get("/profile", authRequired, async (req, res) => {
  try {
    const userProfile = await profile(req);
    res.json(userProfile);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
