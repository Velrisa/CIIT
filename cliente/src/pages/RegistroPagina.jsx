import {useForm} from "react-hook-form";
import {useAuth} from '../context/AuthContext'
import { useEffect, useState  } from "react";
import { useNavigate, Link } from 'react-router-dom';

function RegistroPagina() {
    const {register, handleSubmit, formState: {errors}} = useForm();
    const {signupBatch, esProfesor, signup, isAuthenticated, errors : errorRegistro} = useAuth();
    const navigate = useNavigate();

    //Para comprobar el valor del profesor
    const [value,setValue]=useState(false)

    useEffect(() => {
        if (isAuthenticated) {
          navigate("/trabajos");
        }
      }, [isAuthenticated]);

    const onSubmit = handleSubmit(async (values) => {
        console.log(values);
        signup(values);
    });

    return(
        <div className="flex h-[calc(100vh-100px)] items-center justify-center">
        <div className="bg-zinc-800 max-w-md p-10 rounded-md">
        {
            errorRegistro.map((error, i) => (
                <div className="bg-red-500 p-2 text-white" key={i}> 
                    {error}
                </div>
            ))
        }
        <h1 className="text-2xl font-bold">Registro</h1>
            <form 
            onSubmit={onSubmit}>
                <input type="text" {... register ("numControl", {required: true})}
                className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
                placeholder="Numero de Control"
                />
                {
                    errors.numControl && (
                    <p className="text-red-500">El numero de control es requerido</p>
                    )
                }
                
                <input type="text" {... register ("nombre", {required: true})}
                 className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
                 placeholder="Nombre"
                 />
                {
                    errors.nombre && (
                    <p className="text-red-500">El nombre es requerido</p>
                    )
                }
                <input type="mail" {... register ("correo", {required: true})}
                 className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
                 placeholder="Correo"
                 />
                {
                    errors.correo && (
                    <p className="text-red-500">El correo es requerido</p>
                    )
                }
                <input type="password"  {... register ("password", {required: true})}
                 className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
                 placeholder="Contraseña"
                 />
                {
                    errors.password && (
                    <p className="text-red-500">La Contraseña es requerida</p>
                    )
                }
                <label for="profesor" >Marque la casilla correspondiente si el usuario a registrar es profesor</label><br/>
                <input type="checkbox"
                {... register ("profesor")}
                 id="profesor" name="profesor" checked={value} onChange={(e)=>setValue(e.target.checked)}/><br/>
                <button type="submit" className="bg-indigo-500 px-4 py-1 rounded-sm">Registrar</button>
            </form>
            <p className="flex gap-x-2 justify-between">
                    <Link to="/acceder" className="text-sky-500">Acceder al sistema</Link>
                </p>
        </div>
        </div>
    );
}

export default RegistroPagina;