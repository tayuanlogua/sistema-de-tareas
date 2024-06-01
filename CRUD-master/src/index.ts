import app from "./app.js";
import { connectDB } from "./db.js";

// Puerto del servidor
const PORT = process.env.PORT || 3000;

// Iniciando el servidor y conectando a la base de datos
const startServer = async () => {
  try {
    // Iniciando la aplicación Express
    const server = app.listen(PORT, () => {
      console.log(`Servidor en ejecución en http://localhost:${PORT}`);
    });

    // Conectando a la base de datos
    await connectDB();

    // Manejo de cierre del servidor
    process.on("SIGINT", () => {
      server.close(() => {
        console.log("Servidor cerrado correctamente");
        process.exit(0);
      });
    });
  } catch (error) {
    console.error("Error al iniciar el servidor:", error);
    process.exit(1); // Salir con código de error
  }
};

// Iniciar el servidor
startServer();
