function TodoItem({ todo, setTodos }) {
  const toggleComplete = () => {
    setTodos((prev) =>
      prev.map((t) =>
        t.id === todo.id ? { ...t, completed: !t.completed } : t
      )
    );
  };

  const deleteTodo = () => {
    setTodos((prev) => prev.filter((t) => t.id !== todo.id));
  };

  return (
    <li className="flex justify-between items-center p-2 border-b">
      <span
        className={`grow cursor-pointer ${
          todo.completed ? "line-through text-gray-500" : ""
        }`}
        onClick={toggleComplete}
      >
        {todo.text}
      </span>
      <button
        onClick={deleteTodo}
        className="text-red-500 hover:text-red-700 ml-2"
      >
        ❌
      </button>
    </li>
  );
}

export default TodoItem;
