import { z } from "zod";

export const crearEsquemaCursos= z.object({

  nombre: z.string({
    required_error: "El nombre de la clase es requerido",
  }).min(1, { message: "El nombre de la clase no puede estar vacio",
}),

codigo: z.string({
  required_error: "El codigo de la clase es requerido",
}).min(1, { message: "El codigo de la clase no puede estar vacio",
}),

grupo: z.string({
  required_error: "El grupo es requerido",
}).min(1, { message: "El grupo no puede estar vacio",
}),

salonAsignado: z.string({
    required_error: "El salon es requerido",
  }).min(1, { message: "El salon asignado no puede estar vacio",
  }),
  
});

