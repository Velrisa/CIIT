import { useAuth } from "../context/AuthContext"
import { useRef, useState, useEffect } from 'react';
import { Link } from "react-router-dom";

function PaginaInicio() {

    const {isAuthenticated, esProfesor} = useAuth();

    useEffect(() => {
        if (isAuthenticated) {
          console.log("OK");

            if(esProfesor) console.log("El profesor esta aqui");
            else console.log("El alumno llego")
        }
        else {
            console.log("No");
        }
      }, [isAuthenticated]);

    return (
        
        <div className="flex h-[calc(100vh-100px)] items-center justify-center">
            <div className="bg-zinc-800 max-w-md w-full p-10 rounded-md">
                <h1 className="text-2xl font-bold">¡Bienvenido a la página de cursos!</h1>
                {!isAuthenticated ? 
                (
                <p className="flex gap-x-2 justify-between">
                    En esta página se podrán ver lor cursos que ofrece la plataforma. Si desea utilizar la página,
                    inicie sesion en la página.</p>

                )
                :
                (
                    <h1 className="text-2xl font-bold">Seleccione la acción a realizar</h1>
                )
                }
            </div>
        </div>
    )
}

export default PaginaInicio