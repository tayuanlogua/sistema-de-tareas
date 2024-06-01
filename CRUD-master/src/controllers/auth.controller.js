import User from '../models/user.model.js';
import bcryptjs from 'bcryptjs'
import {createAccessToken} from '../libs/jwt.js'
import jwt from 'jsonwebtoken'
import { TOKEN_SECRET } from '../config.js';


// -----------------register------------------------
export const register = async (req, res)=>{
    const {username, email, password} = req.body 
    
    try {

//primero validaremos el usuario
        const userFound = await User.findOne({email})
            if (userFound) return res.status(400).json( ['The email is already in use']);

// encriptando la contraseña
        const passwordHash =  await bcryptjs.hash(password, 10)

// ----------
// creamos usuario
        const newUser = new User ({
            username,
            email,
            password: passwordHash,
        });

//guardamos el usuario  
    
        const userSaved = await newUser.save();

//creando token
        const token = await createAccessToken({id: userSaved._id});
        res.cookie('token', token) 
// --------------
// respondemos con la informacion del usuario para el front
        res.json({
            id:userSaved._id,
            username: userSaved.username,
            email: userSaved.email,
            createdAt: userSaved.createdAt,
            updateAt: userSaved.updatedAt, 
        });

// si se presenta un error, respondemos con un json que indique el error 
    } catch(error){
        res.status(500).json({message: error.message})
    }



};

// ----------------------login--------------------------

export const login = async (req, res)=>{
    const {password, email} = req.body 
    
    try {
// revisando si el usuario existe 

        const userFound = await User.findOne({email})

        if (!userFound) return res.status(400).json({message: 'User not found'})
        
// comparamos la contraseña
        const isMatch = await bcryptjs.compare(password, userFound.password);

        if (!isMatch) return res.status(400).json({message: 'Incorrect password'})

// creamos el token en el login

        const token = await createAccessToken({id: userFound._id});

        res.cookie('token', token) 
// --------------
// respondemos con la informacion del usuario para el front
        res.json({
            id:userFound._id,
            username: userFound.username,
            email: userFound.email,
            password:userFound.password,
            createdAt: userFound.createdAt,
            updateAt: userFound.updatedAt, 
        });

// si se presenta un error, respondemos con un json que indique el error 
    } catch(error){
        res.status(500).json({message: error.message},
            console.log(error))
    }

};


// ------------------logout--------------------

export const logout = (req, res)=>{
    res.cookie('token', '', {
        expires: new Date(0)})
    return res.sendStatus(200)
}

//  validar token

export const profile = async (req, res) =>{
    const userFound = await User.findById(req.user.id)
    if(!userFound) return res.status(400).json({message:'User not found'});

    return res.json({
        id: userFound.id,
        username: userFound.username,
        email: userFound.email,
        createdAt: userFound.createdAt,
        updatedAt: userFound.updatedAt

    })

    // res.send('Profile')
};

export const verifyToken = async(req, res)=>{
    const {token} = req.cookies
    
    if (!token) return res.status(401).json({message: 'Unauthorized'})

    jwt.verify(token, TOKEN_SECRET, async (err, user)=>{
        if (err) return res.status(401).json({message: 'Unauthorized'});
        const userFound = await User.findById(user.id)
        if (!userFound) return res.status(401).json ({message: 'Unauthorized'})

        return res.json({
            id: userFound._id,
            username: userFound.username,
            email: userFound.email
        })
    })

}

