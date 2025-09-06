import api from "../api/axios";

function TodoList({ todos, fetchTodos, filter, search, page, sort, order }) {
  // ✅ Toggle complete status
  const toggleComplete = async (id, completed) => {
    try {
      await api.put(`/todos/${id}`, { completed: !completed });
      fetchTodos(filter, search, page, sort, order); // refetch
    } catch (error) {
      console.error("Error updating todo:", error);
    }
  };

  // ✅ Delete todo
  const deleteTodo = async (id) => {
    try {
      await api.delete(`/todos/${id}`);
      fetchTodos(filter, search, page, sort, order); // refetch
    } catch (error) {
      console.error("Error deleting todo:", error);
    }
  };

  if (todos.length === 0) {
    return <p className="text-center">No todos found</p>;
  }

  return (
    <ul className="space-y-2">
      {todos.map((todo) => (
        <li
          key={todo._id}
          className="flex justify-between items-center p-2 border rounded"
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
            className="text-red-500 hover:underline"
          >
            Delete
          </button>
        </li>
      ))}
    </ul>
  );
}

export default TodoList;
