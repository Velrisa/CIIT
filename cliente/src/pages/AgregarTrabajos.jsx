import { useForm } from "react-hook-form";
import { useTasks } from "../context/TaskContext";
import {useNavigate, useParams} from 'react-router-dom'
import { useEffect } from "react";
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
dayjs.extend(utc)

export function AgregarTrabajos() {

  const {register, handleSubmit, setValue} = useForm();
  const {createTask, getTask, updateTask} = useTasks();
  const navigate = useNavigate();
  const params = useParams();

  useEffect(() => {

    async function loadTask() {
      if(params.id){
        const task = await getTask(params.id);
        console.log(task);
        setValue('nombre', task.nombre)
        setValue('descripcion', task.descripcion)
        setValue("fecha", dayjs(task.fecha).utc().format("YYYY-MM-DD"))
      }
    }
    loadTask();
  },[])

  const onSubmit = handleSubmit((data) => {
    //En caso de que se este editando un trabajo se comprueba si paras tiene id
    const dataValid = {
      ... data, fecha: data.fecha ? 
      dayjs.utc(data.fecha).format() : 
      dayjs.utc().format(),
    };

    dataValid.date = dayjs.utc(data.fecha).format();
    
    if (params.id) {
      updateTask(params.id,dataValid);
    }
      
      //En caso contrario, se esta creando una nueva tarea
      else {
        createTask(dataValid);
      }
      navigate('/trabajos')
    });

  return (
    <div className="bg-zinc-800 max-w-md w-full p-10 rounded-md my-2">
      <form onSubmit={onSubmit}>
        <label htmlFor="title">Titulo</label>
        <input
          type="text"
          name="nombre"
          placeholder="Nombre"
          {...register("nombre")}
          className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
          autoFocus
        />

        <label htmlFor="description">Descripción</label>
        <textarea
          name="descripcion"
          id="descripcion"
          rows="3"
          placeholder="Descripción"
          {...register("descripcion")}
          className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
        ></textarea>

      <label htmlFor="fecha">Fecha</label>
      <input type="date" name="fecha" {...register("fecha")} 
      className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"/>
        <button className="bg-indigo-500 px-3 py-2 rounded-md">Guardar</button>
      </form>
    </div>
  );
}

export default AgregarTrabajos;