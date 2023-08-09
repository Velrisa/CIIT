import { Router } from "express";
import { crearEsquemaTrabajo} from "../schemas/task.schema.js";
import {
    getTrabajos,
    createTrabajo,
    deleteTrabajo,
    updateTrabajo,
    getTrabajo,
} from "../controllers/task.controller.js";
import { validarEsquema } from "../middlewares/validator.middleware.js";
import { validarAutentificacion } from "../middlewares/validarToken.js";

const router = Router();

router.get("/trabajos", validarAutentificacion, getTrabajos);
router.post("/trabajos", validarAutentificacion, validarEsquema(crearEsquemaTrabajo), 
createTrabajo);
router.get("/trabajos/:id", validarAutentificacion, getTrabajo);
router.put("/trabajos/:id", validarAutentificacion, updateTrabajo);
router.delete("/trabajos/:id", validarAutentificacion, deleteTrabajo);


export default router;
