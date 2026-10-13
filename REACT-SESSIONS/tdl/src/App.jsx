import { useState } from "react";
import Header from "./Components/Header";
import AddTask from "./Components/AddTask";
import Task from "./Components/Task";

const App = () => {
  const [tasks, setTasks] = useState([]);

  const addTaskHandler = (newTask) => {
    setTasks((prevTasks) => {
      console.log("Previous tasks ->", prevTasks);
      return [newTask, ...prevTasks];
    });
  };

  console.log(tasks);
  return (
    <div className="App">
      <Header />
      <AddTask onAdd={addTaskHandler} />
      {tasks.map((taskObj) => {
        return <Task task={taskObj} key={taskObj.id} />;
      })}
    </div>
  );
};

export default App;
