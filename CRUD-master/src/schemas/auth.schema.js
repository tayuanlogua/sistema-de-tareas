// validar los datos que vienen desde el cliente (comprovamos los datos que llegan al backend frente a un esquema que previamente hemos creado desde aca y si coinciden el flujo de la app continua, sino coicide muestra el error)

// zod nos permite crear un schema similar al de mongoose y comparamos 

// z nos permite dar tipos de datos 
import {z} from 'zod';

export const registerSchema = z.object({
    username: z.string({
        required_error: 'Username is required'
    }),
    email: z.string({
        required_error: 'Email is required'
    }).email({
        message: 'Invalid Email'
    }),
    password: z.string({
        required_error: 'Password is required'
    }). min(6, {
        message: 'Password must be at least 6 characters'
    })
});

export const loginSchema = z.object({
    email:z.string({
        required_error: 'Email is required'
    }).email({
        message: 'Invalid email'
    }),
    password: z.string({
        required_error: 'Password is required'
    }). min(6,{
        message: 'Password must be at least 6 characters'
    })
});





