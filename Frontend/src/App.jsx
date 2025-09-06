import { useEffect, useState } from "react";
import api from "./api/axios";
import TodoList from "./components/TodoList";
import AddTodo from "./components/AddTodo";
import Filters from "./components/Filters";

function App() {
  const [todos, setTodos] = useState([]);
  const [filter, setFilter] = useState("all");
  const [loading, setLoading] = useState(true);

  // Fetch todos from backend
  const fetchTodos = async () => {
    try {
      setLoading(true);
      const res = await api.get("/todos?page=1&limit=10&sort=createdAt&order=desc");
      setTodos(res.data.data.todos);
    } catch (error) {
      console.error("Error fetching todos:", error);
    } finally {
      setLoading(false);
    }
  };

  // Add todo
  const addTodo = async (text) => {
    try {
      const res = await api.post("/todos", { text });
      setTodos((prev) => [res.data.data, ...prev]);
    } catch (error) {
      console.error("Error adding todo:", error);
    }
  };

  // Update todo
  const toggleComplete = async (id, completed) => {
    try {
      const res = await api.put(`/todos/${id}`, { completed });
      setTodos((prev) =>
        prev.map((todo) => (todo._id === id ? res.data.data : todo))
      );
    } catch (error) {
      console.error("Error updating todo:", error);
    }
  };

  // Delete todo
  const deleteTodo = async (id) => {
    try {
      await api.delete(`/todos/${id}`);
      setTodos((prev) => prev.filter((todo) => todo._id !== id));
    } catch (error) {
      console.error("Error deleting todo:", error);
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  return (
    <div className="max-w-lg mx-auto p-4">
      <h1 className="text-2xl font-bold text-center mb-4">Todo App</h1>
      <AddTodo addTodo={addTodo} />
      <Filters filter={filter} setFilter={setFilter} />
      {loading ? (
        <p className="text-center">Loading...</p>
      ) : (
        <TodoList
          todos={todos}
          filter={filter}
          toggleComplete={toggleComplete}
          deleteTodo={deleteTodo}
        />
      )}
    </div>
  );
}

export default App;
