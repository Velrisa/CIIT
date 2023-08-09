import mongoose from "mongoose";

export const conectarBD = async () => {
    try{
        await mongoose.connect("mongodb+srv://profesorespro:PzEfwHEeODQHAdbk@cluster0.ijnz2t4.mongodb.net/?retryWrites=true&w=majority",
        {dbName: 'plataformacursos'});
        console.log("Base de datos OK");
    } catch(error){
        console.log(error);
    }
};