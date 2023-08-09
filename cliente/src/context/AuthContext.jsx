import { createContext, useState, useContext, useEffect } from "react";
import {pedirRegistro, accederPlataforma, verificarPeticionToken, verPerfil} from '../api/auth'
import Cookies from 'js-cookie'

export const AuthContext = createContext();

export const useAuth = () => {
    const context = useContext(AuthContext);
    if(!context)
        throw new Error("useAuth se debe de usar con AuthProvider");
    return context;
}

export const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null)
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [esProfesor, setEsProfesor] = useState(false);
    const [errors, setErrors] = useState([]);
    const [loading, setLoading] = useState(true);
    let [nombreUsuario, setNombreDeusuario] = useState();

    const signup =async (user) => {
        try{
            const res = await pedirRegistro(user);
            console.log(res.data);
            setIsAuthenticated(true);
            setUser(res.data);
            alert("El usuario "+user.nombre+ " se ha registrado correctamente");

            if(res.data.profesor) setEsProfesor(true);
            else setEsProfesor(false);


        } catch (error) {
            console.log(error.response);
            setErrors(error.response.data);
            alert("El usuario " +user.nombre+ " y numero de control "+ user.numControl + " no se ha podido registrar porque "+error.response.data);
        }
    }

    //Para el registro por lotes
    const signupBatch =async (user) => {
        try{
            const res = await pedirRegistro(user);
            console.log(res.data);
            setUser(res.data);
            alert("El usuario "+user.nombre+ " se ha registrado correctamente");

        } catch (error) {
            //console.log(error.response);
            setErrors(error.response.data);
            alert("El usuario " +user.nombre+ " y numero de control "+ user.numControl + " no se ha podido registrar porque "+error.response.data);
        }
    }

    const signin = async (user) => {
        try {
          const res = await accederPlataforma(user);
          console.log(res);
          //console.log(user.numControl);
          setIsAuthenticated(true);
          setUser(user.data);
          //Pedir datos del perfil
          const res2 = await verPerfil(user);
          //setNombreDeusuario(res2.data.nombre)
         nombreUsuario = res2.data.nombre
         setNombreDeusuario(nombreUsuario);
          console.log(nombreUsuario)
          console.log(res2.data.profesor)

          if(res2.data.profesor)
            setEsProfesor(true);
          else
            setEsProfesor(false);

          console.log(esProfesor)
        }

        catch (error) {
            if(Array.isArray(error.response.data)){
                return setErrors(error.response.data);
            }
            setErrors([error.response.data.message]);
        }
    }

    /*Limpiar los errores que aparecen e pantalla*/
    useEffect(()=>{
        if (errors.length > 0){
            const timer = setTimeout(() => {
                setErrors([])
            }, 5000)
            return() => clearTimeout(timer)
        }
    }, [errors])


    const signout = () => {
        Cookies.remove("token");
        setEsProfesor(false);
        setIsAuthenticated(false);
        setUser(null);
    }

    //Para que los datos no se recarguen al abrir una nueva pagina
    useEffect(()=>{
    const comprobrarAcceso = async () => {
        const cookies = Cookies.get();
        if (!cookies.token) {
          setIsAuthenticated(false);
          setLoading(false);
          return setUser(null);
        }
  
        try {
          const res = await verificarPeticionToken(cookies.token);
          //console.log(res);
          if (!res.data) return setIsAuthenticated(false);
          /****************/
          setIsAuthenticated(true);
          setUser(res.data);
          setLoading(false);

        } catch (error) {
            setIsAuthenticated(false);
          setUser(null);
          setLoading(false);
        }
      };
      comprobrarAcceso();
    }, []);
  

    return (
        <AuthContext.Provider value ={{
            signup,
            signupBatch,
            signin,
            signout,
            loading,
            user,
            isAuthenticated,
            esProfesor,
            verPerfil,
            errors
        }}>
            {children}
        </AuthContext.Provider>
    )
}