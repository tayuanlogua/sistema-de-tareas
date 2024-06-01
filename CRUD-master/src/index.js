// importamos app. que es la que contiene a los demas servicios
import app from "./app.js";

// importamos la conexión a la base de datos
import { connectDB } from "./db.js";

// con la importacion de app accedemos al medotodo express .listen para iniciar un servidor, en este caso (por el puerto 3000)
app.listen(3000);

// mostramos en que puerto esta corriendo el servicio
console.log("Servidor en el puerto", 3000);
connectDB();
