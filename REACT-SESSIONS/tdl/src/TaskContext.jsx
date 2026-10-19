import { createContext, useState } from "react";

const TaskContext = createContext();

export const TaskContextProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);

  const addTaskHandler = (newTask) => {
    setTasks((prevTasks) => {
      console.log("Previous tasks ->", prevTasks);
      return [newTask, ...prevTasks];
    });
  };
  const removeTaskHandler = (id) => {
    setTasks((prevTasks) => {
      return prevTasks.filter((task) => task.id !== id);
    });
  };

  return (
    <TaskContext.Provider value={{ tasks, addTaskHandler, removeTaskHandler }}>
      {children}
    </TaskContext.Provider>
  );
};

export default TaskContext;
