import { useState } from "react";

export default function TaskForm({ onAdd }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("medium");

  const submit = (e) => {
    e.preventDefault();

    if (!title) return;

    onAdd({
      title,
      description,
      priority,
    });

    setTitle("");
    setDescription("");
    setPriority("medium");
  };

  return (
    <form onSubmit={submit} className="stack-form">

      <label htmlFor="title" className="label-class">
        Title:
      </label>
      <input
        id="title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <label htmlFor="description" className="label-class">
        Description:
      </label>
      <input
        id="description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

      <label htmlFor="priority" className="label-class">
        Priority:
      </label>
      <select id="priority" value={priority} onChange={(e) => setPriority(e.target.value)}>
        <option value="low">Low</option>
        <option value="medium">Medium</option>
        <option value="high">High</option>
      </select>

      <button type="submit">Add Task</button>
    </form>
  );
}