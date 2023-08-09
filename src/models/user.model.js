import mongoose from "mongoose";

//Esquema para la base de datos de usuarios
const esquemaUsuario = new mongoose.Schema({
    numControl: {
        type: String,
        required: true,
        unique: true
    },
    nombre: {
        type: String,
        required: true,
    },
    correo: {
        type:String,
        required: true,
        unique: true
    },
    password: {
        type:String,
        required: true,
    },
    profesor: {
        type:Boolean,
    }
})

export default mongoose.model('Usuario',esquemaUsuario)