"use strict";
import mongoose from "mongoose";

/**
 * Function to connect to the MongoDB database.
 * @async
 * @function connectDB
 * @returns {Promise<void>} A Promise that resolves when the connection is established.
 * @throws {Error} If there is an error connecting to the database.
 */
const connectDB = async () => {
  try {
    // Connection URL from an environment variable
    const dbURI = process.env.MONGODB_URI;

    // Connection configuration options
    const options = {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      // Add other options as needed
    };

    // Connect to the database
    await mongoose.connect(dbURI, options);
    console.log("Connected to the MongoDB database");
  } catch (error) {
    // Error handling
    console.error("Error connecting to the database:", error);
    throw error; // Throw the error to be handled by the application
  }
};

export { connectDB };
