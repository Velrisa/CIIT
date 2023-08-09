import { useTasks } from "../context/TaskContext"
import { Link } from "react-router-dom";
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
dayjs.extend(utc)

function CourseCard({course}) {

    //const {deleteTask} = useTasks()

    return (
        <div className="bg-zinc-800 max-w-md w-full p-10 rounded-md">
            <header className="flex justify-between">
                <h1 className="text-2xl font-bold">{course.nombre}</h1>
            </header>
            Código:<p className="text-slate-300">{course.codigo}</p>
            Grupo:<p className="text-slate-300">{course.grupo}</p>
            Salón:<p className="text-slate-300">{course.salonAsignado}</p>
        </div>
    );
}

export default CourseCard;


