import { useAuth } from "./context/AuthContext"
import { Navigate, Outlet } from "react-router-dom";

function RutaProtegida() {
   const {loading, isAuthenticated} = useAuth();

   if (loading) return <h1>Cargando...</h1>
   if(!loading && !isAuthenticated) return <Navigate to='/acceder' replace />

   return(
        <Outlet/>
    )
}

export default RutaProtegida