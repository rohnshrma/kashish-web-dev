import { useState } from "react";
import { useTodo } from "../context/TodoContext";

export default function TodoForm() {
  const [title, setTitle] = useState("");
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);
  const { addTodo } = useTodo();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title.trim()) {
      setError("Please enter a task");
      return;
    }

    try {
      setSaving(true);
      setError("");
      await addTodo(title.trim());
      setTitle("");
    } catch (err) {
      setError(err.response?.data?.message || "could not add task");
    } finally {
      setSaving(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Enter a new task..."
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <button type="submit" disabled={saving}>
        {saving ? "Adding..." : "Add Task"}
      </button>

      {error && <p className="error">{error}</p>}
    </form>
  );
}
