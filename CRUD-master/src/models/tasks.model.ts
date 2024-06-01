import mongoose from "mongoose";

// Definición del esquema de tarea
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
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // Referencia al modelo de usuario
      required: true,
    },
  },
  {
    timestamps: true, // Agrega campos de createdAt y updatedAt automáticamente
  }
);

// Compilación del modelo de tarea
const Task = mongoose.model("Task", taskSchema);

export default Task;
