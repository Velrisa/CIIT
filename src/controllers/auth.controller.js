import Usuario from '../models/user.model.js';
import bcrypt from 'bcryptjs';
import {crearTokenAcceso} from '../libs/jwt.js';
import jwt from 'jsonwebtoken';
import { TOKEN_SECRET } from '../config.js';

export const registro = async (req, res) => {
    const {numControl,nombre,correo,password,profesor} = req.body;
    try{

        const usuarioEncontrado = await Usuario.findOne({ correo });
        if (usuarioEncontrado)
          return res.status(400).json(["El correo ya esta en uso"]);

         const usuarioEncontrado2 = await Usuario.findOne({ numControl });

          if (usuarioEncontrado2)
          return res.status(400).json(
            ["El número de control ya esta en uso"]);
        const passHash = await bcrypt.hash(password,10); //Encriptar contraseña

        const nuevoUsuario = new Usuario({
            numControl,
            nombre,
            correo,
            password: passHash,
            profesor
        });

        const usuarioGuardado = await nuevoUsuario.save();
        const token = await crearTokenAcceso({id: usuarioGuardado._id});
        res.cookie('token', token);

       res.json({id: usuarioGuardado._id,
            nombre: usuarioGuardado.nombre,
            numControl: usuarioGuardado.numControl,
            email: usuarioGuardado.email,
            profesor: usuarioGuardado.profesor,
        });
    }
    catch(error){
        res.status(500).json({message: error.message});
    }
};

export const acceder = async (req, res) => {
    const {numControl,password} = req.body;
    try{
        const usuarioValido = await Usuario.findOne({numControl});
        if (!usuarioValido) return res.status(400).json({message: "Datos invalidos"});

        const seEncuentra = await bcrypt.compare(password,usuarioValido.password);
        if(!seEncuentra) return res.status(400).json({message: "Datos invalidos"});

        const token = await crearTokenAcceso({id: usuarioValido._id});
        res.cookie('token', token);

       res.json({id: seEncuentra._id,
            nombre: seEncuentra.nombre,
            numControl: seEncuentra.numControl,
            email: seEncuentra.email,
            profesor: seEncuentra.profesor,
        });
    }
    catch(error){
        res.status(500).json({message: error.message});
    }
};

export const salir = (req, res ) => {
    res.cookie('token', "", {
        expires: new Date(0)
    })
    return res.sendStatus(200);
};

export const perfil = async (req, res) => {
    const usuarioEncontrado = await Usuario.findById(req.user.id);
    if (!usuarioEncontrado) return res.status(400)({message: "Usuario no encontrado"})

    return res.json({id: usuarioEncontrado._id,
        nombre: usuarioEncontrado.nombre,
        numControl: usuarioEncontrado.numControl,
        email: usuarioEncontrado.email,
        profesor: usuarioEncontrado.profesor,
    });
};

export const verificarToken = async (req, res) => {
    const {token} = req.cookies

    if (!token) return res.status(401).json({message: "No autorizado"});

    jwt.verify(token, TOKEN_SECRET, async (err, user) => {
        if(err) return res.status(401).json({message: "No autorizado"});

        const usuarioEncontrado = await Usuario.findById(user.id);
        if(!usuarioEncontrado) return res.status(401).json({message:
            "No autorizado"});

            return res.json({
                id: usuarioEncontrado._id,
                numControl: usuarioEncontrado.numControl
            });
    })
} 

