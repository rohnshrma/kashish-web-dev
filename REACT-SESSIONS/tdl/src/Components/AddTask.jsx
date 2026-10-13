import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
const AddTask = (props) => {
  const [task, setTask] = useState({
    title: "",
    description: "",
  });

  const titleChangeHandler = (e) => {
    setTask((prevTask) => {
      console.log("Previous task => ", prevTask);
      return {
        title: e.target.value,
        description: prevTask.description,
      };
    });
  };
  const descChangeHandler = (e) => {
    setTask((prevTask) => {
      console.log("Previous task => ", prevTask);
      return { title: prevTask.title, description: e.target.value };
    });
  };

  const submitHandler = (e) => {
    e.preventDefault();

    const newTask = {
      ...task,
      id: uuidv4(),
    };

    props.onAdd(newTask);
  };

  return (
    <form className="add-task" onSubmit={submitHandler}>
      <div>
        <input
          onChange={titleChangeHandler}
          type="text"
          placeholder="task name..."
        />
      </div>
      <div>
        <input
          onChange={descChangeHandler}
          type="text"
          placeholder="task description..."
        />
      </div>
      <button>SUBMIT</button>
    </form>
  );
};

export default AddTask;
