import TodoItem from "./TodoItem";

function TodoList({ todos, setTodos }) {
  return (
    <ul className="divide-y">
      {todos.length === 0 ? (
        <p className="text-gray-500 text-center">No tasks yet.</p>
      ) : (
        todos.map((todo) => (
          <TodoItem key={todo.id} todo={todo} setTodos={setTodos} />
        ))
      )}
    </ul>
  );
}

export default TodoList;
