import Header from "./Components/Header";
import AddTask from "./Components/AddTask";

import TaskList from "./Components/TaskList";

const App = () => {
  return (
    <div className="App">
      <Header />
      <AddTask />
      <TaskList />
    </div>
  );
};

export default App;
