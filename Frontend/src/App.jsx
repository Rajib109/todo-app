import { useEffect, useState } from "react";
import api from "./api/axios";
import TodoList from "./components/TodoList";
import AddTodo from "./components/AddTodo";
import Filters from "./components/Filters";
import SearchBar from "./components/SearchBar";
import Pagination from "./components/Pagination";
import SortControls from "./components/SortControls"; // 🔹 new

function App() {
  const [todos, setTodos] = useState([]);
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  // pagination states
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);
  const [limit] = useState(5);

  // sorting states
  const [sort, setSort] = useState("createdAt"); // default: newest first
  const [order, setOrder] = useState("desc");

  // Fetch todos from backend
  const fetchTodos = async (
    selectedFilter = filter,
    searchTerm = search,
    currentPage = page,
    currentSort = sort,
    currentOrder = order
  ) => {
    try {
      setLoading(true);

      let url = `/todos?page=${currentPage}&limit=${limit}&sort=${currentSort}&order=${currentOrder}`;

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
    fetchTodos(filter, search, page, sort, order);
  }, [filter, search, page, sort, order]); // 🔹 now also triggers on sort/order

  return (
    <div className="max-w-lg mx-auto p-4">
      <h1 className="text-2xl font-bold text-center mb-4">Todo App</h1>
      <AddTodo
        fetchTodos={fetchTodos}
        filter={filter}
        search={search}
        page={page}
        sort={sort}
        order={order}
      />
      <SearchBar search={search} setSearch={setSearch} />
      <Filters filter={filter} setFilter={setFilter} />
      <SortControls
        sort={sort}
        setSort={setSort}
        order={order}
        setOrder={setOrder}
      />{" "}
      {/* 🔹 new */}
      {loading ? (
        <p className="text-center">Loading...</p>
      ) : (
        <>
          <TodoList
            todos={todos}
            fetchTodos={fetchTodos}
            filter={filter}
            search={search}
            page={page}
            sort={sort}
            order={order}
          />

          <Pagination page={page} pages={pages} setPage={setPage} />
        </>
      )}
    </div>
  );
}

export default App;
