import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

const TodoContext = createContext();

const API_URI = "http://localhost:5500/api/todos";

export function TodoProvider({ children }) {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchTodos = async () => {
    try {
      setError("");
      const response = await axios.get(API_URI);
      console.log(response.data);
      setTodos(response.data.data);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to load tasks");
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchTodos();
  }, []);

  const addTodo = async (title) => {
    const response = await axios.post(API_URI, { title });
    console.log(response.data);
    setTodos((prevTasks) => [response.data.data, ...prevTasks]);
  };

  const deleteTodo = async (id) => {
    await axios.delete(`${API_URI}/${id}`);

    setTodos((prevTasks) => prevTasks.filter((todo) => todo._id !== id));
  };

  const updateTodo = async (id, updates) => {
    const response = await axios.patch(`${API_URI}/${id}`, updates);
    setTodos((prevTasks) =>
      prevTasks.map((todo) => (todo._id === id ? response.data.data : todo)),
    );
  };

  return (
    <TodoContext.Provider
      value={{ todos, loading, error, addTodo, deleteTodo, updateTodo }}
    >
      {children}
    </TodoContext.Provider>
  );
}

export function useTodo() {
  return useContext(TodoContext);
}
