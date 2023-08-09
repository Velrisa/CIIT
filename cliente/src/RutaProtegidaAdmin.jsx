import { useAuth } from "./context/AuthContext"
import { Navigate, Outlet } from "react-router-dom";

function RutaProtegidaAdmin() {
   const {loading, isAuthenticated, esProfesor} = useAuth();

   if (loading) return <h1>Cargando...</h1>
   if(!loading && !isAuthenticated) return <Navigate to='/acceder' replace />
   if(!esProfesor && !loading && !isAuthenticated)return <Navigate to='/' replace />

   return(
        <Outlet/>
    )
}

export default RutaProtegidaAdmin