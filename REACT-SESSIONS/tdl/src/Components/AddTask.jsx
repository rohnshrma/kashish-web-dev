import { useContext, useReducer } from "react";
import { v4 as uuidv4 } from "uuid";
import TaskContext from "../TaskContext";

const initialState = {
  title: "",
  description: "",
};

const taskReducer = (state, action) => {
  if (action.type === "title" || action.type === "description") {
    return {
      ...state, // copy previous/ current state
      [action.type]: action.payload, // overwrite
    };
  }
  if (action.type === "RESET") {
    return initialState;
  }

  return initialState;
};

const AddTask = () => {
  const [task, dispatch] = useReducer(taskReducer, initialState);

  const { addTaskHandler } = useContext(TaskContext);

  const changeHandler = (e) => {
    const { name, value } = e.target;
    dispatch({ type: name, payload: value });
  };

  const submitHandler = (e) => {
    e.preventDefault();

    const newTask = {
      ...task,
      id: uuidv4(),
    };

    addTaskHandler(newTask);

    dispatch({ type: "RESET" });
  };

  return (
    <form className="add-task" onSubmit={submitHandler}>
      <div>
        <input
          onChange={changeHandler}
          type="text"
          name="title"
          value={task.title}
          placeholder="task name..."
        />
      </div>
      <div>
        <input
          onChange={changeHandler}
          type="text"
          name="description"
          value={task.description}
          placeholder="task description..."
        />
      </div>
      <button>SUBMIT</button>
    </form>
  );
};

export default AddTask;
