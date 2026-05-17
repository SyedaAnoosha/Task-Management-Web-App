import { useEffect, useState } from "react";
import { getTasks, createTask, completeTask, deleteTask } from "../api_service/api";


import TaskForm from "../components/TaskForm";
import TaskList from "../components/TaskList";

export default function Home() {
  const [tasks, setTasks] = useState([]);

  const loadTasks = async () => {
    const res = await getTasks();
    setTasks(res.data);
  };

  useEffect(() => {
    const init = async () => {
      await loadTasks();
    };

    init();
  }, []);

  const handleAdd = async (task) => {
    await createTask(task);
    loadTasks();
  };

  const handleComplete = async (id) => {
    await completeTask(id);
    loadTasks();
  };

  const handleDelete = async (id) => {
    await deleteTask(id);
    loadTasks();
  };

  return (
    <div>
      <TaskForm onAdd={handleAdd} />
      <TaskList
        tasks={tasks}
        onComplete={handleComplete}
        onDelete={handleDelete}
      />
    </div>
  );
}