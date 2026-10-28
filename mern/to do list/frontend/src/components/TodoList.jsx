import { useState } from "react";
import { useTodo } from "../context/TodoContext";
import Todo from "./Todo";

export default function TodoList() {
  const { todos, loading, error, updateTodo } = useTodo();

  const [editingId, setEditingId] = useState(null);
  const [editTitle, setEditTitle] = useState("");
  const [actionError, setActionError] = useState("");

  const handleEdit = (todo) => {
    setEditingId(todo._id);
    setEditTitle(todo.title);
    setActionError("");
  };

  const handleSave = async (id) => {
    if (!editTitle.trim()) {
      setActionError("Task title cannot be empty");
      return;
    }

    try {
      setActionError("");
      await updateTodo(id, { title: editTitle.trim() });
      setEditingId(null);
    } catch (err) {
      setActionError(err.response?.data?.message || "update failed");
    }
  };

  const handleCancel = () => {
    setEditingId(null);
    setActionError("");
  };

  if (loading) return <p>Loading tasks...</p>;
  if (error) return <p className="error">{error}</p>;

  return (
    <div>
      {actionError && <p className="error">{actionError}</p>}

      {todos.length === 0 ? (
        <p>No tasks yet. Add one above!</p>
      ) : (
        <ul>
          {todos.map((todo) => (
            <Todo
              key={todo._id}
              todo={todo}
              isEditing={editingId === todo._id}
              editTitle={editTitle}
              setEditTitle={setEditTitle}
              onEdit={handleEdit}
              onSave={handleSave}
              onCancel={handleCancel}
              onError={setActionError}
            />
          ))}
        </ul>
      )}
    </div>
  );
}
