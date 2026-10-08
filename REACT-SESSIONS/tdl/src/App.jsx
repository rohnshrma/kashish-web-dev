import { useState } from "react";
import Header from "./Components/Header";
import AddTask from "./Components/AddTask";

const App = () => {
  const [tasks, setTasks] = useState([]);

  const addTaskHandler = (task) => {
    console.log(task);
  };

  return (
    <div className="App">
      <Header />
      <AddTask onAdd={addTaskHandler} />
    </div>
  );
};

export default App;
