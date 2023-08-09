import { Router } from "express";
import { crearEsquemaCursos} from "../schemas/courses.schema.js";
import {
    createCurso,getCursos/*,getCurso, updateCurso, deleteCurso*/
} from "../controllers/courses.controller.js";
import { validarEsquema } from "../middlewares/validator.middleware.js";

import { validarAutentificacion } from "../middlewares/validarToken.js";

const router = Router();

router.get("/cursos", validarAutentificacion, getCursos);
router.post("/cursos", validarAutentificacion, validarEsquema(crearEsquemaCursos), 
createCurso);
//router.get("/cursos/:id", validarAutentificacion, getCurso);
//router.put("/cursos/:id", validarAutentificacion, updateCurso);
//router.delete("/cursos/:id", validarAutentificacion, deleteCurso);


export default router;
