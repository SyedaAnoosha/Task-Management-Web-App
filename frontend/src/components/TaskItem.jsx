export default function TaskItem({ task, onComplete, onDelete }) {
  const isCompleted = task.status === "completed";

  return (
    <div className="task-card">
      <h4>{task.title}</h4>
      <p className="muted">Description: {task.description || "No description provided"}</p>
      <p>Status: <strong>{task.status}</strong></p>
      <p>Priority: <em>{task.priority}</em></p>

      <div style={{ display: 'flex', gap: 8, marginTop: 8 }}>
        <button onClick={() => onComplete(task.id, task.status)}>
          {isCompleted ? "Mark Pending" : "Mark Completed"}
        </button>

        <button onClick={() => onDelete(task.id)} style={{ background: 'transparent', color: 'var(--pink-800)', border: '1px solid var(--border)' }}>
          Delete
        </button>
      </div>
    </div>
  );
}