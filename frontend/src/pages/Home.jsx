import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  getTasks,
  createTask,
  updateTask,
  deleteTask,
} from "../services/api";

import TaskForm from "../components/TaskForm";
import TaskList from "../components/TaskList";

export default function Home() {
  const navigate = useNavigate();

  const [tasks, setTasks] = useState([]);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/login");
      return;
    }

    const loadTasks = async () => {
      try {
        const params = {};
        if (statusFilter) params.status = statusFilter;
        if (search) params.q = search;
        const res = await getTasks(params);
        setTasks(res.data);
      } catch (err) {
        console.log(err);
      }
    };

    loadTasks();
  }, [navigate, search, statusFilter]);

  const handleAdd = async (task) => {
    await createTask(task);
    const res = await getTasks({ status: statusFilter || undefined, q: search || undefined });
    setTasks(res.data);
  };

  const handleComplete = async (id, currentStatus) => {
    const newStatus = currentStatus === "completed" ? "pending" : "completed";
    await updateTask(id, { status: newStatus });
    const res = await getTasks({ status: statusFilter || undefined, q: search || undefined });
    setTasks(res.data);
  };

  const handleDelete = async (id) => {
    await deleteTask(id);
    const res = await getTasks({ status: statusFilter || undefined, q: search || undefined });
    setTasks(res.data);
  };

  return (
    <div>
      <h1>Task Management Application</h1>

      <TaskForm onAdd={handleAdd} />

      <div style={{ marginTop: 12 }}>
        <input
          placeholder="Search tasks"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            // reload after updating search
            getTasks({ status: statusFilter || undefined, q: e.target.value || undefined })
              .then((res) => setTasks(res.data))
              .catch((err) => console.log(err));
          }}
        />

        <select
          value={statusFilter}
          onChange={(e) => {
            setStatusFilter(e.target.value);
            getTasks({ status: e.target.value || undefined, q: search || undefined })
              .then((res) => setTasks(res.data))
              .catch((err) => console.log(err));
          }}
        >
          <option value="">All</option>
          <option value="pending">Pending</option>
          <option value="completed">Completed</option>
        </select>
      </div>

      <TaskList
        tasks={tasks}
        onComplete={handleComplete}
        onDelete={handleDelete}
      />
    </div>
  );
}