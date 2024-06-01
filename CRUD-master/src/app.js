"use strict";
import express from "express";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import cors from "cors";
import authRoutes from "./routes/auth.routes.js";
import tasksRoutes from "./routes/tasks.routes.js";

const app = express();

// Cookie security configuration
app.use(
  cookieParser({
    sameSite: "strict",
    httpOnly: true,
  })
);

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
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Internal Server Error");
});

// Route consumption
app.use("/api", authRoutes);
app.use("/api", tasksRoutes);

export default app;
