// importamos express para poder acceder a sus metodos
import express from 'express';

// morgan nos ayudara a mostrar lo que sucede cuando hacemos las solicitudes http
import morgan from 'morgan';

// importamos cookie parser para analizar las cookies de las solicitudes http
import cookieParser from 'cookie-parser';

// importamos auth routes que son basicamente las rutas del login y register
import authRoutes from './routes/auth.routes.js'

// importamos taskRoutes, que es basicamente las rutas de las targetas o tasks. 
import taskRoutes from './routes/tasks.routes.js'

// importamos cors para solucionar el problema que se genera en el navegador por generar solicitudes por aparte, desde el front y el back
import cors from 'cors'


// -----------despues de importaciones---------------------

// inicializamos express para poder acceder a sus metodos y lo almacenamos en una constante app
const app = express(); 

// ---------------------midlewares-----------------------

// ejecutamos cors, lo que hace es permitir que todos los dominios se puedan comunicar en este servidor, y siendo mas explicito en el parametro podemos colocar el origen de la url que puede comunicar con el servidor 
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}));

// -1-usamos morgan, cuando iniciamos el proyecto con el script 'dev'
app.use(morgan('dev'));

// nos sirve para analizar el cuerpo de las solicitudes http. convirtiendo a json
app.use(express.json());

// nos sirve para habilitar el middleware (cookieParser) basicamente lo inicializamos
app.use(cookieParser());


// consumimos las rutas-------------------------

// 1- le damos primero un valor previo a las rutas, en este caso es '/api' nos sirve para agregar a las rutas este string y que estas siempre empiecen asi 
app.use('/api',authRoutes);
app.use('/api', taskRoutes);


// exportamos la app
export default app;