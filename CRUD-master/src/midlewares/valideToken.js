// los midlewares son funciones que se ejecutan antes de que lleguen a una ruta 


// en esta funcion primero recibimos la informacion de la peticion, da metodos para recibir una respuesta(req, res), y el next lo que hace es que en vez de retornar una respuesta al cliente continua, por que hay una funcion despues de esta, basicamente le decimos que continue en el auth.routes.js al profile


// en este caso nos sirve, para que si hay un token continue, si no lo hay que responda que no estas autorizado o algo por el estilo 
import jwt from "jsonwebtoken";
import {TOKEN_SECRET} from '../config.js'

export const authRequired = (req, res, next) =>{
    const { token } = req.cookies
    
    if (!token) 
    return res.status(401).json({message: 'No token, authorization denied'});    

// user lo empleamos como si fuera decoded
    jwt.verify(token, TOKEN_SECRET, (err, user)=>{
        if (err) res.status(403).json({message: 'Invalid token'});

        req.user = user;

        next();

    })
}