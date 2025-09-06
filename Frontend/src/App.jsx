import { useEffect, useState } from "react";
import api from "./api/axios";
import TodoList from "./components/TodoList";
import AddTodo from "./components/AddTodo";
import Filters from "./components/Filters";
import SearchBar from "./components/SearchBar";
import Pagination from "./components/Pagination"; // 🔹 new

function App() {
  const [todos, setTodos] = useState([]);
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  // pagination states
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);
  const [limit] = useState(5); // default 5 per page

  // Fetch todos from backend
  const fetchTodos = async (selectedFilter = filter, searchTerm = search, currentPage = page) => {
    try {
      setLoading(true);

      let url = `/todos?page=${currentPage}&limit=${limit}&sort=createdAt&order=desc`;

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
      setPages(res.data.data.pages);
      setPage(res.data.data.page);
    } catch (error) {
      console.error("Error fetching todos:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTodos(filter, search, page);
  }, [filter, search, page]);

  return (
    <div className="max-w-lg mx-auto p-4">
      <h1 className="text-2xl font-bold text-center mb-4">Todo App</h1>
      <AddTodo addTodo={(text) => fetchTodos()} />
      <SearchBar search={search} setSearch={setSearch} />
      <Filters filter={filter} setFilter={setFilter} />
      {loading ? (
        <p className="text-center">Loading...</p>
      ) : (
        <>
          <TodoList
            todos={todos}
            filter={filter}
            toggleComplete={(id, completed) => fetchTodos()}
            deleteTodo={(id) => fetchTodos()}
          />
          <Pagination page={page} pages={pages} setPage={setPage} />
        </>
      )}
    </div>
  );
}

export default App;
