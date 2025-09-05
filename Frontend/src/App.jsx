import { useState } from "react";
import AddTodo from "./components/AddTodo";
import TodoList from "./components/TodoList";

function App() {
  const [todos, setTodos] = useState([]);
  const [filter, setFilter] = useState("all"); // all | active | completed

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
      <div className="bg-white shadow-lg rounded-2xl p-6 w-full max-w-md">
        <h1 className="text-2xl font-bold text-center mb-4">Todo App</h1>

        <AddTodo todos={todos} setTodos={setTodos} />

        {/* Filter Buttons */}
        <div className="flex justify-center gap-2 my-4">
          <button
            onClick={() => setFilter("all")}
            className={`px-3 py-1 rounded-lg ${
              filter === "all" ? "bg-blue-500 text-white" : "bg-gray-200"
            }`}
          >
            All
          </button>
          <button
            onClick={() => setFilter("active")}
            className={`px-3 py-1 rounded-lg ${
              filter === "active" ? "bg-blue-500 text-white" : "bg-gray-200"
            }`}
          >
            Active
          </button>
          <button
            onClick={() => setFilter("completed")}
            className={`px-3 py-1 rounded-lg ${
              filter === "completed" ? "bg-blue-500 text-white" : "bg-gray-200"
            }`}
          >
            Completed
          </button>
        </div>

        <TodoList todos={todos} setTodos={setTodos} filter={filter} />
      </div>
    </div>
  );
}

export default App;
