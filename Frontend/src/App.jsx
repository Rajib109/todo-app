import { useEffect, useState } from "react";
import api from "./api/axios";
import TodoList from "./components/TodoList";
import AddTodo from "./components/AddTodo";
import Filters from "./components/Filters";
import SearchBar from "./components/SearchBar"; // new

function App() {
  const [todos, setTodos] = useState([]);
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState(""); // 🔹 new
  const [loading, setLoading] = useState(true);

  // Fetch todos from backend
  const fetchTodos = async (selectedFilter = "all", searchTerm = "") => {
    try {
      setLoading(true);

      let url = `/todos?page=1&limit=10&sort=createdAt&order=desc`;

      if (selectedFilter === "active") {
        url += "&completed=false";
      } else if (selectedFilter === "completed") {
        url += "&completed=true";
      }

      if (searchTerm) {
        url += `&search=${encodeURIComponent(searchTerm)}`;
      }

      const res = await api.get(url);
      setTodos(res.data.data.todos);
    } catch (error) {
      console.error("Error fetching todos:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTodos(filter, search);
  }, [filter, search]); // 🔹 refetch on search change too

  return (
    <div className="max-w-lg mx-auto p-4">
      <h1 className="text-2xl font-bold text-center mb-4">Todo App</h1>
      <AddTodo addTodo={(text) => fetchTodos(filter, search)} />
      <SearchBar search={search} setSearch={setSearch} /> {/* 🔹 new */}
      <Filters filter={filter} setFilter={setFilter} />
      {loading ? (
        <p className="text-center">Loading...</p>
      ) : (
        <TodoList
          todos={todos}
          filter={filter}
          toggleComplete={(id, completed) => fetchTodos(filter, search)}
          deleteTodo={(id) => fetchTodos(filter, search)}
        />
      )}
    </div>
  );
}

export default App;
