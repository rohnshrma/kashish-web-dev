import Task from "./Task";

const TaskList = ({ tasks, onRemove }) => {
  return (
    <div>
      {tasks.map((taskObj) => {
        return <Task onRemove={onRemove} task={taskObj} key={taskObj.id} />;
      })}
    </div>
  );
};

export default TaskList;
