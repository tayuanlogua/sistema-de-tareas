import express from "express";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import cors from "cors";
import authRoutes from "./routes/auth.routes.js";
import taskRoutes from "./routes/tasks.routes.js";

const app = express();

// Configuración de seguridad para cookies
app.use(
  cookieParser({
    sameSite: "strict",
    httpOnly: true,
  })
);

// Configuración de CORS
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

// Middleware de registro de solicitudes
app.use(morgan("dev"));

// Middleware para analizar el cuerpo de las solicitudes HTTP
app.use(express.json());

// Middleware para manejar errores
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Error interno del servidor");
});

// Consumo de las rutas
app.use("/api", authRoutes);
app.use("/api", taskRoutes);

export default app;
