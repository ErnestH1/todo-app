import { useEffect, useState } from "react";

function DeleteTodo() {
  const [todos, setTodos] = useState([]);
  const [deletingTodo, setDeletingTodo] = useState(null);
  const [message, setMessage] = useState("");

  const fetchTodos = async () => {
    try {
      const response = await fetch("https://example.com/api/todos");
      if (response.ok) {
        const todos = await response.json();
        setTodos(todos);
      } else {
        setMessage("Failed to fetch tasks.");
      }
    } catch (error) {
      setMessage("Failed to communicate with the server.");
    }
  };

  const handleDelete = async (todo) => {
    try {
      const response = await fetch(
        `https://example.com/api/todos/${todo.id}`,
        {
          method: "DELETE"
        }
      );
      if (response.ok) {
        const updatedTodos = todos.filter((t) => t.id !== todo.id);
        setTodos(updatedTodos);
        setDeletingTodo(null);
        setMessage("Task deleted successfully.");
      } else {
        setMessage("Failed to delete task.");
      }
    } catch (error) {
      setMessage("Failed to communicate with the server.");
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  return (
    <div>
      <h2>Delete Todo</h2>
      {message && <p>{message}</p>}
      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>
            {deletingTodo && deletingTodo.id === todo.id ? (
              <div>
                <span>Are you sure you want to delete "{todo.name}"?</span>
                <button type="button" onClick={() => handleDelete(todo)}>
                  Yes
                </button>
                <button type="button" onClick={() => setDeletingTodo(null)}>
                  No
                </button>
              </div>
            ) : (
              <div>
                <span>{todo.name}</span>
                <button type="button" onClick={() => setDeletingTodo(todo)}>
                  Delete
                </button>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default DeleteTodo;