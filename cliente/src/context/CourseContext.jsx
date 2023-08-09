import { createContext, useContext, useState } from "react";
import {createCourseRequest, 
    getCourseRequest,
    getCoursesRequest,
    updateCourseRequest, 
    deleteCourseRequest } from '../api/courses'

const CourseContext = createContext();

export const useCourses = () => {
    const context = useContext(CourseContext);

    if(!context){
        throw new Error("useCourse se debe de usar con CourseProvider");
    }

    return context;
}

export function CourseProvider ({children}) {

    const [courses, setCourses] = useState([]);

    const createCourse = async (course) =>{
        const res = await createCourseRequest(course);
    }

    const getCourses = async () => {
        try{
        const res = await getCoursesRequest();
        setCourses(res.data);
        }
        catch(error){
            console.error(error);
        }
    }

  
    return (
        <CourseContext.Provider value ={{
            courses,
            createCourse,
            getCourses
        }}>
            {children}
        </CourseContext.Provider>
    )
}