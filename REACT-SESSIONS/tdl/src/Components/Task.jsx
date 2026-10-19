import { useContext } from "react";
import TaskContext from "../TaskContext";

const Task = ({ task }) => {
  const { removeTaskHandler } = useContext(TaskContext);

  return (
    <div>
      <h3>{task.title}</h3>
      <p>{task.description}</p>
      <button onClick={() => removeTaskHandler(task.id)}>Delete</button>
    </div>
  );
};

export default Task;
