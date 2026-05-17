import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

export const getTasks = () => API.get("/tasks");

export const createTask = (data) => API.post("/tasks", data);

export const completeTask = (id) => API.put(`/tasks/${id}`);

export const deleteTask = (id) => API.delete(`/tasks/${id}`);