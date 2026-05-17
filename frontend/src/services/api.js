import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
});

API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");

  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }

  return req;
});

export const getTasks = () => API.get("/tasks");
export const createTask = (data) => API.post("/tasks", data);
export const completeTask = (id) => API.put(`/tasks/${id}`, { status: "completed" });
export const deleteTask = (id) => API.delete(`/tasks/${id}`);

export const registerUser = (data) => API.post("/auth/register", data);
export const loginUser = (data) => API.post("/auth/login", data);