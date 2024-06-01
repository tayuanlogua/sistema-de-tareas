// importamos mongoose, para poder acceder a sus metodos 
import mongoose from 'mongoose';

// realizamos la exportacion con en una constante llamada connectDB y desde el index la consumimos pero para ello debemos desestructurar en index {}
export const connectDB = async()=>{

// conectamos a la base de datos por medio del link generado en mongoDB atlas, es necesario poner el nombre de la base de datos el usuario y la contraseña
    try{
        await mongoose.connect('mongodb+srv://jorgeorincono:1030655045Jv@cluster0.tkroekh.mongodb.net/mernDB?retryWrites=true&w=majority&appName=Cluster0');

// si se puede conectar, nos enseña por consola que la conexion fue exitosa
        console.log('Conectado a la base de datos')
    }

// si no se logra conectar a la base de datos, esta nos muestra el error que tiene por consola
    catch (error){
        console.log(error)
    }
};