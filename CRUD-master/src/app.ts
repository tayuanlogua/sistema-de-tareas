import express, { Request, Response, NextFunction } from "express";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import cors from "cors";
import authRoutes from "./routes/auth.routes";
import taskRoutes from "./routes/tasks.routes";

const app = express();

// Cookie security configuration
app.use(cookieParser());

// Configuración de seguridad para cookies
app.use((req, res, next) => {
  res.cookie("SameSite", "Strict", {
    sameSite: "strict",
    httpOnly: true,
  });
  next();
});

// CORS configuration
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

// Request logging middleware
app.use(morgan("dev"));

// Middleware for parsing HTTP request bodies
app.use(express.json());

// Error handling middleware
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(500).send("Internal Server Error");
});

// Route consumption
app.use("/api", authRoutes);
app.use("/api", taskRoutes);

export default app;
