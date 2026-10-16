import { useReducer } from "react";
import { v4 as uuidv4 } from "uuid";

const initialState = {
  title: "",
  description: "",
};

const taskReducer = (state, action) => {
  if (action.type === "TITLE") {
    return {
      title: action.payload,
      description: state.description,
    };
  }

  if (action.type === "DESCRIPTION") {
    return {
      description: action.payload,
      title: state.title,
    };
  }
  return initialState;
};

const AddTask = (props) => {
  const [task, dispatch] = useReducer(taskReducer, initialState);

  const titleChangeHandler = (e) => {
    dispatch({ type: "TITLE", payload: e.target.value });
  };
  const descChangeHandler = (e) => {
    dispatch({ type: "DESCRIPTION", payload: e.target.value });
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
