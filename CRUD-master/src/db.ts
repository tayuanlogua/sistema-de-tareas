// importamos mongoose, para poder acceder a sus metodos
import mongoose from "mongoose";

// Función para conectar a la base de datos
export const connectDB = async () => {
  try {
    // URL de conexión a la base de datos desde una variable de entorno
    const dbURI = process.env.MONGODB_URI;

    // Opciones de configuración de la conexión
    const options = {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      // Otras opciones según sea necesario
    };

    // Conexión a la base de datos
    await mongoose.connect(dbURI, options);

    console.log("Conectado a la base de datos MongoDB");
  } catch (error) {
    // Manejo de errores
    console.error("Error al conectar a la base de datos:", error);
    throw error; // Lanzar el error para que sea manejado por la aplicación
  }
};
