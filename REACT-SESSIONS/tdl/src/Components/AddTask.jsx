import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
const AddTask = (props) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const titleChangeHandler = (e) => {
    setTitle(e.target.value);
  };
  const descChangeHandler = (e) => {
    setDescription(e.target.value);
  };

  const submitHandler = (e) => {
    e.preventDefault();

    const task = {
      title,
      description,
      id: uuidv4(),
    };

    props.onAdd(task);
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
