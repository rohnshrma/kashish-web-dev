const Task = ({ task, onRemove }) => {
  return (
    <div>
      <h3>{task.title}</h3>
      <p>{task.description}</p>
      <button onClick={() => onRemove(task.id)}>Delete</button>
    </div>
  );
};

export default Task;
