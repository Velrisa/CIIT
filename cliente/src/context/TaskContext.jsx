import { createContext, useContext, useState } from "react";
import {createTaskRequest, 
    getTaskRequest,
    getTasksRequest,
    updateTaskRequest, 
    deleteTaskRequest } from '../api/task'
const TaskContext = createContext();

export const useTasks = () => {
    const context = useContext(TaskContext);

    if(!context){
        throw new Error("useTask se debe de usar con TaskProvider");
    }

    return context;
}

export function TaskProvider ({children}) {

    const [tasks, setTasks] = useState([]);

    const getTasks = async () => {
        try{
        const res = await getTasksRequest();
        setTasks(res.data);
        }
        catch(error){
            console.error(error);
        }
    }

    const createTask = async (task) =>{
        const res = await createTaskRequest(task);
        //console.log(res);
    }

    const deleteTask = async (id) => {

        if (confirm("¿Desea borrar la tarea?")) {
            try {
                const res = await deleteTaskRequest(id)
                if (res.status === 204){setTasks(tasks.filter((task) => task._id !== id))
                    alert("Tarea borrada exitosamente");
                };
            }
            catch (error) {
                console.log(error);
            }

          } else {
            //alert("Ha cancelado la opción");
          }
    }

    const getTask = async (id) => {
        try{
        const res = await getTaskRequest(id);
        return res.data;
        }
        catch (error){
            console.log(error);
        }
    }

    const updateTask = async (id, task) => {
        try {
            await updateTaskRequest(id,task);

        } catch (error) {
            console.log(error);
        }
    }
   
    return (
        <TaskContext.Provider value ={{
            tasks,
            createTask,
            getTasks,
            deleteTask,
            getTask,
            updateTask
        }}>
            {children}
        </TaskContext.Provider>
    )
}