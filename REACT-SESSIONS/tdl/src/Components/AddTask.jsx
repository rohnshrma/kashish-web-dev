import { useState } from "react";

const AddTask = (props) => {
  const [title, setTitle] = useState("");

  const titleChangeHandler = (e) => {
    setTitle(e.target.value);
  };

  const submitHandler = (e) => {
    e.preventDefault();

    props.onAdd(title);
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
      <button>SUBMIT</button>
    </form>
  );
};

export default AddTask;
