// Import mongoose to access its methods
import mongoose from "mongoose";

// Function to connect to the database
export const connectDB = async () => {
  try {
    // Database connection URL from an environment variable
    const dbURI = process.env.MONGODB_URI;

    // Connect to the database
    await mongoose.connect(dbURI!, {
      // Other options as needed
    });

    console.log("Connected to MongoDB database");
  } catch (error) {
    // Error handling
    console.error("Error connecting to the database:", error);
    throw error; // Throw the error to be handled by the application
  }
};
