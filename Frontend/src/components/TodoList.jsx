import { useState } from "react";
import api from "../api/axios";

function TodoList({ todos, fetchTodos, filter, search, page, sort, order }) {
  const [loadingId, setLoadingId] = useState(null);
  const [error, setError] = useState("");

  const toggleComplete = async (id, completed) => {
    try {
      setLoadingId(id);
      setError("");
      await api.put(`/todos/${id}`, { completed: !completed });
      fetchTodos(filter, search, page, sort, order);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to update todo");
    } finally {
      setLoadingId(null);
    }
  };

  const deleteTodo = async (id) => {
    try {
      setLoadingId(id);
      setError("");
      await api.delete(`/todos/${id}`);
      fetchTodos(filter, search, page, sort, order);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to delete todo");
    } finally {
      setLoadingId(null);
    }
  };

  if (todos.length === 0) {
    return <p className="text-center">No todos found</p>;
  }

  return (
    <>
      {error && <p className="text-red-500 text-sm mb-2">{error}</p>}

      <ul className="space-y-2">
        {todos.map((todo) => (
          <li
            key={todo._id}
            className="flex justify-between items-center p-2 border rounded-sm"
          >
            <span
              onClick={() => toggleComplete(todo._id, todo.completed)}
              className={`cursor-pointer ${
                todo.completed ? "line-through text-gray-500" : ""
              }`}
            >
              {todo.text}
            </span>
            <button
              onClick={() => deleteTodo(todo._id)}
              disabled={loadingId === todo._id}
              className="text-red-500 hover:underline disabled:opacity-50"
            >
              {loadingId === todo._id ? "..." : "Delete"}
            </button>
          </li>
        ))}
      </ul>
    </>
  );
}

export default TodoList;
