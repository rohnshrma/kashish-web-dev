import { useContext } from "react";
import Task from "./Task";
import TaskContext from "../TaskContext";

const TaskList = () => {
  const { tasks } = useContext(TaskContext);

  return (
    <div>
      {tasks.map((taskObj) => {
        return <Task task={taskObj} key={taskObj.id} />;
      })}
    </div>
  );
};

export default TaskList;
