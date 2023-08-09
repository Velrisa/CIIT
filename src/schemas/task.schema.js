import { z } from "zod";

export const crearEsquemaTrabajo = z.object({
  nombre: z.string({
    required_error: "El título es requerido",
  }).min(1, { message: "El titulo no puede estar vacio",
}),

  descripcion: z.string({
    required_error: "La descripción es requerida",
  }).min(1, { message: "La descripcion no puede estar vacia",
  }),
  fecha: z.string().datetime().optional(),
});