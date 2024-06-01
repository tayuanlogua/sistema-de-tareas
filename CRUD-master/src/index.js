"use strict";
import app from "./app";
import { connectDB } from "./db";

// Server port
const PORT = process.env.PORT || 3000;

// Starting the server and connecting to the database
const startServer = async () => {
  try {
    // Starting the Express application
    const server = app.listen(PORT, () => {
      console.log(`Server running at http://localhost:${PORT}`);
    });

    // Connecting to the database
    await connectDB();

    // Server close handling
    process.on("SIGINT", () => {
      server.close(() => {
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
