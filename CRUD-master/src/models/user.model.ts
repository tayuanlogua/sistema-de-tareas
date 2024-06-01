import mongoose from "mongoose";

// Definición del esquema de usuario
const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      unique: true, // Garantiza que cada correo electrónico sea único en la base de datos
    },
    password: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true, // Agrega campos de createdAt y updatedAt automáticamente
  }
);

// Compilación del modelo de usuario
const User = mongoose.model("User", userSchema);

export default User;
