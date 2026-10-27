import { useState } from "react";
import { useTodo } from "../context/TodoContext";

export default function TodoList() {
  const { todos, loading, error, updateTodo, deleteTodo } = useTodo();

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
}
