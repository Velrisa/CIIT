import {useForm} from 'react-hook-form';
import { useAuth } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import { useRef, useState, useEffect } from 'react';
import ReCAPTCHA from "react-google-recaptcha"

function AccesoPagina() {

    const [captchaValido, cambiarCaptchaValido] = useState(false);

    function onChange(value) {
        cambiarCaptchaValido(true)
        //console.log("Valor Captcha: ", value);
      }

    const captcha = useRef(null);

    const {register, handleSubmit, formState: {errors}} = useForm();
    const navigate = useNavigate();

    const {signin, errors: errorAcceso, isAuthenticated } = useAuth();

    useEffect(() => {
        if (isAuthenticated) {
          navigate("/trabajos");
        }
      }, [isAuthenticated]);

    const onSubmit = handleSubmit (data => {
        signin(data);
    });

    return(
        <div className="flex h-[calc(100vh-100px)] items-center justify-center">
            <div className="bg-zinc-800 max-w-md w-full p-10 rounded-md">
            {
            errorAcceso.map((error, i) => (
                <div className="bg-red-500 p-2 text-white text-center my-2" key={i}> 
                    {error}
                </div>
            ))}
                <h1 className="text-2xl font-bold">Acceso</h1>
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
                    <input type="password"  {... register ("password", {required: true})}
                    className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
                    placeholder="Contraseña"
                    />
                    {
                        errors.password && (
                        <p className="text-red-500">La Contraseña es requerida</p>
                        )
                    }
                    <ReCAPTCHA
                        ref={captcha}
                        sitekey="6LdtN20nAAAAAKB-963sc3Fl7XlK3pwfNg531n6H"
                        onChange={onChange}
                    />

                    <button type="submit" className="bg-indigo-500 px-4 py-1 rounded-sm" disabled={!captchaValido} >Iniciar Sesión</button>
                </form>
                {/*<p className="flex gap-x-2 justify-between">
                    <Link to="/registro" className="text-sky-500">Agregar una cuenta nueva</Link>
                </p>*/}
            </div>
        </div>
    )
}

export default AccesoPagina;