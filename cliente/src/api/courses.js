import axios from "./axios";

export const getCoursesRequest = async () => axios.get("/cursos");
export const getCourseRequest = async (id) => axios.get(`/cursos/${id}`);
export const createCourseRequest = async (course) => axios.post("/cursos", course);
export const updateCourseRequest = async (id, course) => axios.put(`/cursos/${id}`
, course);
export const deleteCourseRequest = async (id) => axios.delete(`/cursos/${id}`);

