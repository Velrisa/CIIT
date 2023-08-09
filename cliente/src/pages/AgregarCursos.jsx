import { useForm } from "react-hook-form";
import {useCourses} from "../context/CourseContext";
import {useNavigate, useParams} from 'react-router-dom'
import {codigoClase} from '../resources/codigoClase.js';
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
dayjs.extend(utc)

export function AgregarCursos() {
  var codigo = codigoClase();

  const {register, handleSubmit} = useForm();
  const {createCourse} = useCourses();
  const navigate = useNavigate();
  const onSubmit = handleSubmit((data) => {

    createCourse(data);
    navigate('/');
    });

  return (
    <div className="bg-zinc-800 max-w-md w-full p-10 rounded-md my-2">
      <h1 className="text-2xl font-bold">Agregar curso</h1><br/>
      <form onSubmit={onSubmit}>
        <label htmlFor="nombre">Nombre</label>
        <input
          type="text"
          name="nombre"
          placeholder="Nombre"
          {...register("nombre")}
          className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
          autoFocus
        />

        <label htmlFor="codigo">Código (Nota: Es generado de manera automatica)</label>
        <input
          type="text"
          name="codigo"
          id="codigo"
          placeholder="Código de la Clase"
          value={codigo}
          setFormText ={codigo}
          {...register("codigo")}
          className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2">
        </input>
        
        <label htmlFor="grupo">Grupo</label>
        <input
          type="text"
          name="grupo"
          placeholder="Grupo"
          {...register("grupo")}
          className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
        />
        <label htmlFor="salonAsignado">Salon Asignado</label>
        <input
          type="text"
          name="salonAsignado"
          placeholder="Salon Asignado"
          {...register("salonAsignado")}
          className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
        />

        <button className="bg-indigo-500 px-3 py-2 rounded-md">Guardar</button>
      </form>
    </div>
  );
}

export default AgregarCursos;