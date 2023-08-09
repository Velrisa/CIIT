import { Router } from "express";
import { acceder, registro, salir, perfil, verificarToken } from "../controllers/auth.controller.js";
import {validarAutentificacion} from '../middlewares/validarToken.js'
import { validarEsquema } from "../middlewares/validator.middleware.js";
import { esquemaAcceso, esquemaRegistro } from "../schemas/auth.schema.js";
const router = Router()

router.post('/registro', validarEsquema(esquemaRegistro), registro);
router.post('/acceder', validarEsquema(esquemaAcceso), acceder);
router.post('/salir', salir);

router.get('/perfil', validarAutentificacion, perfil);

router.get('/verificar', verificarToken);
export default router