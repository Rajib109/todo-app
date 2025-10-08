import { useState } from "react";
import api from "../api/axios";

function AddTodo({ fetchTodos, filter, search, page, sort, order }) {
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!text.trim()) {
      setError("Todo text is required");
      return;
    }

    try {
      setLoading(true);
      setError("");

      await api.post("/todos", { text });
      setText(""); // clear input
      fetchTodos(filter, search, page, sort, order); // refetch todos
    } catch (err) {
      setError(err.response?.data?.message || "Failed to add todo");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-2 mb-4">
      <div className="flex gap-2">
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Add a new todo"
          className="flex-1 p-2 border rounded-sm"
        />
        <button
          type="submit"
          disabled={loading}
          className="px-4 py-2 bg-blue-500 text-white rounded-sm disabled:opacity-50"
        >
          {loading ? "Adding..." : "Add"}
        </button>
      </div>

      {error && <p className="text-red-500 text-sm">{error}</p>}
    </form>
  );
}

export default AddTodo;
