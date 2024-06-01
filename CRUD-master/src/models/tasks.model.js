const mongoose = require("mongoose");

// Task schema definition
const taskSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    date: {
      type: Date,
      default: Date.now,
    },
    dueDate: {
      type: Date,
      required: true, // Make the field required
    },
    status: {
      type: String,
      required: true,
      enum: ["pending", "in progress", "completed"], // Possible values for status
      default: "pending", // Default value
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // Reference to the user model
      required: true,
    },
  },
  {
    timestamps: true, // Automatically add createdAt and updatedAt fields
  }
);

// Compile the task model
const Task = mongoose.model("Task", taskSchema);

module.exports = Task;
