import { useEffect } from "react"
import { useCourses } from "../context/CourseContext"
import CourseCard from '../components/CourseCard'

function Cursos() {
    
    const {getCourses, courses} = useCourses();

    useEffect(() => {
        getCourses();
    },[]);
    
    if (courses.length == 0) return (<h1>No hay cursos</h1>);

    return <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-2"> {
        courses.map(course => ( 
        <CourseCard course={course} key={course._id}/>
            ))
            
        }</div>;
}

export default Cursos;