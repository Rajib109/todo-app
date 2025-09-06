import { useState } from "react";
import api from "../api/axios";

function AddTodo({ fetchTodos, filter, search, page, sort, order }) {
  const [text, setText] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!text.trim()) return;

    try {
      await api.post("/todos", { text });
      setText(""); // clear input
      fetchTodos(filter, search, page, sort, order); // refetch todos
    } catch (error) {
      console.error("Error adding todo:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 mb-4">
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Add a new todo"
        className="flex-1 p-2 border rounded"
      />
      <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded">
        Add
      </button>
    </form>
  );
}

export default AddTodo;
