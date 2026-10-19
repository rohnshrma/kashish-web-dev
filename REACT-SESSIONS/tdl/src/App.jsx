import { useState } from "react";
import Header from "./Components/Header";
import AddTask from "./Components/AddTask";

import TaskList from "./Components/TaskList";

const App = () => {
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

  console.log(tasks);
  return (
    <div className="App">
      <Header />
      <AddTask onAdd={addTaskHandler} />
      <TaskList onRemove={removeTaskHandler} tasks={tasks} />
    </div>
  );
};

export default App;
