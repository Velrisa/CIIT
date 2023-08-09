import {BrowserRouter, Routes, Route} from 'react-router-dom';
import AccesoPagina from './pages/AccesoPagina';
import RegistroPagina from './pages/RegistroPagina';
import Trabajos from './pages/Trabajos';
import AgregarTrabajos from './pages/AgregarTrabajos';
import Perfil from './pages/Perfil';
import PaginaInicio from './pages/PaginaInicio';
import AgregarUsuariosLote from './pages/AgregarUsuariosLote';
import AgregarCursos from './pages/AgregarCursos';
import Cursos from './pages/Cursos'
import RutaProtegida from './RutaProtegida'
import RutaProtegidaAdmin from './RutaProtegidaAdmin'

import {AuthProvider} from './context/AuthContext'
import { TaskProvider } from './context/TaskContext';
import { CourseProvider } from './context/CourseContext';

import Navbar from './components/Navbar'

function App(){
  return(
    <AuthProvider>
      <CourseProvider>
      <TaskProvider>
        <BrowserRouter>
        <main className='container mx-auto px-5'>
        <Navbar/>
              <Routes>
                <Route path='/' element={<PaginaInicio/>}/>
                <Route path='/acceder' element={<AccesoPagina/>}/>
                <Route path='/registro' element={<RegistroPagina/>}/>
                <Route element={<RutaProtegida/>}>
                <Route path='/cursos' element={<Cursos/>}/>
                <Route path='/agregar-cursos' element={<AgregarCursos/>}/>
                  <Route path='/trabajos' element={<Trabajos/>}/>
                  <Route path='/agregar-trabajos' element={<AgregarTrabajos/>}/>
                  <Route path='/trabajos/:id' element={<AgregarTrabajos/>}/>
                  <Route path='/perfil' element={<Perfil/>}/>
                    <Route element={<RutaProtegidaAdmin/>}>
                      <Route path='/registro-por-lote' element={<AgregarUsuariosLote/>}/>
                    </Route>
                </Route>
              </Routes>
        </main>
        </BrowserRouter>
      </TaskProvider>
      </CourseProvider>
    </AuthProvider>
  )
}

export default App
