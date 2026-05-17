export default function TaskItem({ task, onComplete, onDelete }) {
  return (
    <div style={{ border: "1px solid #ccc", margin: 10, padding: 10 }}>
      <h4>{task.title}</h4>
      <p>Description: {task.description}</p>
      <p>Status: {task.status}</p>
      <p>Priority: {task.priority}</p>

      <button onClick={() => onComplete(task.id)}>
        Mark Completed
      </button>

      <button onClick={() => onDelete(task.id)}>
        Delete
      </button>
    </div>
  );
}