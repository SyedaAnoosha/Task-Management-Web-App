import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  getTasks,
  createTask,
  updateTask,
  deleteTask,
} from "../services/api";

export default function Home() {
  const navigate = useNavigate();

  const [tasks, setTasks] = useState([]);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("medium");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/login");
      return;
    }

    const loadTasks = async () => {
      try {
        const params = {};
        if (statusFilter !== "all") params.status = statusFilter;
        if (search) params.q = search;
        const res = await getTasks(params);
        setTasks(res.data);
      } catch (err) {
        console.log(err);
      } finally {
        setIsLoading(false);
      }
    };

    loadTasks();
  }, [navigate, search, statusFilter]);

  const handleAdd = async (task) => {
    await createTask(task);
    const params = {};
    if (statusFilter !== "all") params.status = statusFilter;
    if (search) params.q = search;
    const res = await getTasks(params);
    setTasks(res.data);
  };

  const handleComplete = async (id, currentStatus) => {
    const newStatus = currentStatus === "completed" ? "pending" : "completed";
    await updateTask(id, { status: newStatus });
    const params = {};
    if (statusFilter !== "all") params.status = statusFilter;
    if (search) params.q = search;
    const res = await getTasks(params);
    setTasks(res.data);
  };

  const handleDelete = async (id) => {
    await deleteTask(id);
    const params = {};
    if (statusFilter !== "all") params.status = statusFilter;
    if (search) params.q = search;
    const res = await getTasks(params);
    setTasks(res.data);
  };

  const stats = useMemo(() => {
    const completed = tasks.filter((task) => task.status === "completed").length;
    const pending = tasks.filter((task) => task.status !== "completed").length;

    return [
      { label: "Total tasks", value: tasks.length, accent: "from-indigo-500 to-indigo-600" },
      { label: "In progress", value: pending, accent: "from-sky-500 to-cyan-500" },
      { label: "Completed", value: completed, accent: "from-emerald-500 to-lime-500" },
    ];
  }, [tasks]);

  const submitTask = async (event) => {
    event.preventDefault();

    if (!title.trim()) return;

    await handleAdd({
      title: title.trim(),
      description: description.trim(),
      priority,
    });

    setTitle("");
    setDescription("");
    setPriority("medium");
  };

  const badgeClassByStatus = (status) =>
    status === "completed"
      ? "bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200"
      : "bg-slate-100 text-slate-600 ring-1 ring-slate-200";

  const badgeLabelByStatus = (status) =>
    status === "completed" ? "Completed" : "In Progress";

  const priorityClassByValue = (value) => {
    if (value === "high") return "bg-orange-50 text-orange-700 ring-1 ring-orange-200";
    if (value === "low") return "bg-slate-100 text-slate-600 ring-1 ring-slate-200";
    return "bg-blue-50 text-blue-700 ring-1 ring-blue-200";
  };

  return (
    <div className="min-h-screen pb-28 lg:pb-10">
      <header className="sticky top-0 z-50 border-b border-slate-200/70 bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3">
            <div>
              <p className="text-lg font-semibold uppercase tracking-[0.3em] text-slate-900">
                FocusFlow
              </p>
            </div>
          </div>

          <nav className="hidden items-center gap-6 md:flex">
            <button
              className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition hover:border-indigo-200 hover:text-indigo-600"
              type="button"
              onClick={() => {
                localStorage.removeItem("token");
                navigate("/login");
              }}
            >
              Log out
            </button>
          </nav>
        </div>
      </header>

      <main id="dashboard" className="mx-auto flex max-w-7xl flex-col gap-8 px-4 py-8 sm:px-6 lg:px-8">
        <section className="grid gap-6">
          <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white p-6">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
              <div className="max-w-2xl space-y-4">
                <div className="space-y-3">
                  <h2 className="text-3xl font-bold sm:text-4xl">
                    Your Tasks on Track:
                  </h2>
                </div>
              </div>
            </div>

            <div className="mt-8 grid gap-4 sm:grid-cols-3">
              {stats.map((stat) => (
                <div key={stat.label} className="rounded-2xl border border-slate-200 bg-slate-50/80 p-4">
                  <div className={`mb-4 h-2 rounded-full bg-gradient-to-r ${stat.accent}`} />
                  <p className="text-sm font-medium text-slate-500">{stat.label}</p>
                  <p className="mt-2 text-3xl font-bold text-slate-900">{stat.value}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="grid gap-6">
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex items-center gap-3">
              <span className="material-symbols-outlined text-[24px] text-indigo-600">add_task</span>
              <div>
                <h3 className="text-xl font-semibold text-slate-900">Create New Task</h3>
              </div>
            </div>

            <form className="mt-6 space-y-4" onSubmit={submitTask}>
              <div className="grid gap-4 sm:grid-cols-2">
                <label className="space-y-2 sm:col-span-2">
                  <span className="text-sm font-medium text-slate-600">Task Title</span>
                  <input
                    id="task-title-input"
                    className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition focus:border-indigo-500 focus:bg-white"
                    placeholder="e.g. Design system audit"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    type="text"
                  />
                </label>

                <label className="space-y-2">
                  <span className="text-sm font-medium text-slate-600">Priority</span>
                  <select
                    className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-100"
                    value={priority}
                    onChange={(e) => setPriority(e.target.value)}
                  >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                  </select>
                </label>

                <label className="space-y-2">
                  <span className="text-sm font-medium text-slate-600">Status</span>
                  <div className="rounded-2xl border border-slate-200 bg-slate-100 px-4 py-3 text-sm font-medium text-slate-500">
                    Pending
                  </div>
                </label>
              </div>

              <label className="block space-y-2">
                <span className="text-sm font-medium text-slate-600">Description</span>
                <textarea
                  className="min-h-28 w-full resize-none rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-100"
                  placeholder="Briefly describe the task objectives..."
                  rows={4}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </label>

              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  className="rounded-2xl border border-slate-200 px-5 py-3 text-sm font-semibold text-slate-600 transition hover:border-slate-300 hover:text-slate-900"
                  type="button"
                  onClick={() => {
                    setTitle("");
                    setDescription("");
                    setPriority("medium");
                  }}
                >
                  Clear
                </button>
                <button
                  className="inline-flex items-center justify-center gap-2 rounded-2xl bg-indigo-600 px-6 py-3 text-sm font-semibold text-white shadow-sm shadow-indigo-600/20 transition hover:-translate-y-0.5 hover:bg-indigo-500"
                  type="submit"
                >
                  <span className="material-symbols-outlined text-[20px]">add</span>
                  Add Task
                </button>
              </div>
            </form>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
              
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined text-[24px] text-indigo-600">search</span>
                <div>
                  <h3 className="text-xl font-semibold text-slate-900">Search and filter tasks</h3>
                </div>
              </div>
              <div className="flex flex-col gap-3 sm:flex-row">
                <div className="relative w-full sm:w-80">
                  <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
                    search
                  </span>
                  <input
                    className="w-full rounded-full border border-slate-200 bg-slate-50 py-3 pl-11 pr-4 text-sm outline-none transition focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-100"
                    placeholder="Search tasks..."
                    type="search"
                    value={search}
                    onChange={async (e) => {
                      const nextValue = e.target.value;
                      setSearch(nextValue);
                      const params = {};
                      if (statusFilter !== "all") params.status = statusFilter;
                      if (nextValue) params.q = nextValue;
                      const res = await getTasks(params);
                      setTasks(res.data);
                    }}
                  />
                </div>

                <select
                  className="rounded-full border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-medium text-slate-700 outline-none transition focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-100"
                  value={statusFilter}
                  onChange={async (e) => {
                    const nextValue = e.target.value;
                    setStatusFilter(nextValue);
                    const params = {};
                    if (nextValue !== "all") params.status = nextValue;
                    if (search) params.q = search;
                    const res = await getTasks(params);
                    setTasks(res.data);
                  }}
                >
                  <option value="all">All tasks</option>
                  <option value="pending">Pending</option>
                  <option value="completed">Completed</option>
                </select>
              </div>
            </div>

            <div id="tasks" className="mt-6">
              {isLoading ? (
                <div className="rounded-2xl border border-dashed border-slate-200 bg-slate-50 p-8 text-center text-sm text-slate-500">
                  Loading tasks...
                </div>
              ) : tasks.length === 0 ? (
                <div className="flex flex-col items-center justify-center rounded-3xl border border-dashed border-slate-200 bg-slate-50 px-8 py-12 text-center">
                  <div className="mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-indigo-50 text-indigo-500">
                    <span className="material-symbols-outlined text-[40px]">task_alt</span>
                  </div>
                  <h4 className="text-xl font-semibold text-slate-900">No tasks yet</h4>
                  <p className="mt-2 max-w-sm text-sm leading-6 text-slate-500">
                    Start by adding your first task above to kickstart your productivity flow.
                  </p>
                </div>
              ) : (
                <div className="grid gap-4 md:grid-cols-2 2xl:grid-cols-3">
                  {tasks.map((task) => {
                    const completed = task.status === "completed";

                    return (
                      <article
                        key={task.id}
                        className={`flex flex-col justify-between rounded-3xl border bg-white p-5 shadow-sm transition hover:-translate-y-0.5 ${
                          completed ? "border-slate-200/80 opacity-85" : "border-slate-200"
                        }`}
                      >
                        <div>
                          <div className="flex items-start justify-between gap-4">
                            <span className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${badgeClassByStatus(task.status)}`}>
                              {badgeLabelByStatus(task.status)}
                            </span>
                            <span
                              className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold capitalize ${priorityClassByValue(
                                task.priority,
                              )}`}
                            >
                              {task.priority || "medium"}
                            </span>
                          </div>

                          <h4
                            className={`mt-4 text-lg font-semibold text-slate-900 ${
                              completed ? "line-through decoration-slate-400 decoration-2" : ""
                            }`}
                          >
                            {task.title}
                          </h4>
                          <p className="mt-2 text-sm leading-6 text-slate-600">
                            {task.description || "No description provided."}
                          </p>
                        </div>

                        <div className="mt-6 flex items-center gap-3">
                          <button
                            className="inline-flex flex-1 items-center justify-center gap-2 rounded-2xl border border-slate-200 px-4 py-3 text-sm font-semibold text-slate-700 transition hover:border-slate-300 hover:bg-slate-50"
                            type="button"
                            onClick={() => handleDelete(task.id)}
                          >
                            <span className="material-symbols-outlined text-[18px]">delete</span>
                            Delete
                          </button>
                          <button
                            className={`inline-flex flex-1 items-center justify-center gap-2 rounded-2xl px-4 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5 ${
                              completed ? "bg-amber-600 hover:bg-amber-500" : "bg-indigo-600 hover:bg-indigo-500"
                            }`}
                            type="button"
                            onClick={() => handleComplete(task.id, task.status)}
                          >
                            <span className="material-symbols-outlined text-[18px]">
                              {completed ? "undo" : "check_circle"}
                            </span>
                            {completed ? "Undo" : "Complete"}
                          </button>
                        </div>
                      </article>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        </section>
      </main>

      {/* mobile bottom nav removed */}
    </div>
  );
}