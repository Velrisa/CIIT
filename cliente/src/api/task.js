import axios from "./axios";

export const getTasksRequest = async () => axios.get("/trabajos");
export const getTaskRequest = async (id) => axios.get(`/trabajos/${id}`);
export const createTaskRequest = async (task) => axios.post("/trabajos", task);
export const updateTaskRequest = async (id, task) =>
  axios.put(`/trabajos/${id}`, task);
export const deleteTaskRequest = async (id) => axios.delete(`/trabajos/${id}`);


