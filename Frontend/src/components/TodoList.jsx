import TodoItem from "./TodoItem";

function TodoList({ todos, setTodos, filter }) {
  const filteredTodos = todos.filter((todo) => {
    if (filter === "active") return !todo.completed;
    if (filter === "completed") return todo.completed;
    return true; // all
  });

  return (
    <ul className="divide-y">
      {filteredTodos.length === 0 ? (
        <p className="text-gray-500 text-center">No tasks found.</p>
      ) : (
        filteredTodos.map((todo) => (
          <TodoItem key={todo.id} todo={todo} setTodos={setTodos} />
        ))
      )}
    </ul>
  );
}

export default TodoList;
