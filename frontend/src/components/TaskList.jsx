import TaskItem from "./TaskItem";

export default function TaskList({ tasks, onComplete, onDelete }) {
  return (
    <div>
      {tasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          onComplete={onComplete}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}