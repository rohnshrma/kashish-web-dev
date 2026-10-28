import { useTodo } from "../context/TodoContext";

const Todo = ({
  todo,
  isEditing,
  editTitle,
  setEditTitle,
  onEdit,
  onSave,
  onCancel,
  onError,
}) => {
  const { updateTodo, deleteTodo } = useTodo();

  const toggleHandler = async () => {
    try {
      await updateTodo(todo._id, { completed: !todo.completed });
    } catch (err) {
      onError(err.response?.data?.message || "update failed");
    }
  };

  const deleteHandler = async () => {
    try {
      await deleteTodo(todo._id);
    } catch (err) {
      onError(err.response?.data?.message || "delete failed");
    }
  };

  if (isEditing) {
    return (
      <li>
        <input
          type="text"
          value={editTitle}
          onChange={(e) => setEditTitle(e.target.value)}
        />
        <button onClick={() => onSave(todo._id)}>Save</button>
        <button onClick={onCancel}>Cancel</button>
      </li>
    );
  }

  return (
    <li>
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={toggleHandler}
      />
      <span
        style={{ textDecoration: todo.completed ? "line-through" : "none" }}
      >
        {todo.title}
      </span>
      <button onClick={() => onEdit(todo)}>Edit</button>
      <button onClick={deleteHandler}>Delete</button>
    </li>
  );
};

export default Todo;
