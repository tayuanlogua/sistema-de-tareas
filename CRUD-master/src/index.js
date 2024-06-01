"use strict";
import express from "express";
import swaggerUi from "swagger-ui-express";
import swaggerDocument from "./swagger.json"; // Path to the OpenAPI documentation file
import app from "./app";
import { connectDB } from "./db";

const PORT = process.env.PORT || 3000;
const server = express();

// Middleware to serve Swagger documentation
server.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Start the server and connect to the database
const startServer = async () => {
  try {
    // Starting the Express application
    const serverInstance = app.listen(PORT, () => {
      console.log(`Server running at http://localhost:${PORT}`);
    });

    // Connecting to the database
    await connectDB();

    // Server close handling
    process.on("SIGINT", () => {
      serverInstance.close(() => {
        console.log("Server closed successfully");
        process.exit(0);
      });
    });
  } catch (error) {
    console.error("Error starting the server:", error);
    process.exit(1); // Exit with error code
  }
};

// Start the server
startServer();
