import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  getTasks,
  createTask,
  completeTask,
  deleteTask,
} from "../services/api";

import TaskForm from "../components/TaskForm";
import TaskList from "../components/TaskList";

export default function Home() {
  const navigate = useNavigate();

  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/login");
      return;
    }

    const loadTasks = async () => {
      try {
        const res = await getTasks();
        setTasks(res.data);
      } catch (err) {
        console.log(err);
      }
    };

    loadTasks();
  }, [navigate]);

  const handleAdd = async (task) => {
    await createTask(task);
    const res = await getTasks();
    setTasks(res.data);
  };

  const handleComplete = async (id) => {
    await completeTask(id);
    const res = await getTasks();
    setTasks(res.data);
  };

  const handleDelete = async (id) => {
    await deleteTask(id);
    const res = await getTasks();
    setTasks(res.data);
  };

  return (
    <div>
      <h1>Task Management Application</h1>
      <h2>Made by Syeda Anoosha Iqtidar</h2>
      <button
        onClick={() => {
          localStorage.removeItem("token");
          navigate("/login");
        }}
      >
        Logout
      </button>

      <TaskForm onAdd={handleAdd} />

      <TaskList
        tasks={tasks}
        onComplete={handleComplete}
        onDelete={handleDelete}
      />
    </div>
  );
}