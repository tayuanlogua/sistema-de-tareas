// importaciones
// 1,- desestructuramos e importamos la clase Router desde express
import { Router } from "express";

// desde los controladores importamos login, logout, register, profile, que basicamente son nuestras solicitudes http
import {login, logout, register, profile, verifyToken} from '../controllers/auth.controller.js'

// importamos desde nuestros middlewares, authRequired, que basicamente es la autenticacion desde valideToken
import { authRequired } from "../midlewares/valideToken.js";

//importamos el validateSchema para comparar nuestro esquema con los datos que nos estan llegando 
import { validateSchema } from '../midlewares/validator.midleware.js'

// importamos los esquemas para la validacion y comparacion
import { registerSchema, loginSchema } from '../schemas/auth.schema.js'
// import { verify } from "jsonwebtoken";

// ejecutamos Router y lo almacenamos en una constante router, para poder acceder a sus metodos
const router = Router();

// router.post, con 'register', lo que hacemos aca basicamente es acceder al metodo post con el controlador register, para poder realizar la solicitud http
router.post('/register', validateSchema(registerSchema),register);

// router.post, con 'login', lo que hacemos aca basicamente es acceder al metodo post con el controlador login, para poder realizar la solicitud http
router.post('/login', validateSchema(loginSchema),login);

// router.post, con 'logout', lo que hacemos aca basicamente es acceder al metodo post con el controlador logout, para poder realizar la solicitud http
router.post('/logout', logout)

// verificamos el token
router.get('/verify', verifyToken)

// validar token (revisar si el usuario esta autenticado o no,(rutas protegidas))

// realizamos la solicitud get, con el controlador profile para poder hacer la solicitud http

// los parametros se ejecutan en orden en este caso se ejecuta el validador antes que el profile 
router.get('/profile', authRequired, profile)



export default router;           