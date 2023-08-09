import {z} from "zod";

export const esquemaRegistro = z.object({
    nombre: z.string ({
        required_error: "El nombre es requerido",
    }).min(1, { message: "El nombre no puede estar vacio",
    }),
    numControl: z.string ({
        required_error: "El numero de control es requerido",
    }).min(1, { message: "El número de control debe de tener una"+ 
    "longitud de 1 o mas caracteres",
    }).max(9, {
        message: "El número de control solo puede tener una longitud"+ 
        "de 9 o menos caracteres",
    }),
    correo: z.string({
        required_error: "El correo es requerido",
    }).email({
        message: "El correo no tiene un formato inválido",
    }),
    password: z.string({
        required_error: "La contraseña es requerida",
    }). min(4, {
        message: "La contraseña debe de tener al menos 4 caracteres",
    }),
});

export const esquemaAcceso = z.object({
    numControl: z.string ({
        required_error: "El numero de control es requerido",
    }).min(1, { message: "El número de control debe de tener una longitud de 1 o más caracteres",
    }).max(9, {
        message: "El número de control solo puede tener una longitud de 9 o menos caracteres",
    }),

    password: z.string({
        required_error: "La contraseña es requerida",
    }). min(4, {
        message: "La contraseña debe de tener al menos 4 caracteres",
    }),
});