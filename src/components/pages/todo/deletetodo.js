import { useEffect, useState } from "react";
import './DeleteTodo.css'

function DeleteTodo() {
  const [todos, setTodos] = useState([]);
  const [deletingTodo, setDeletingTodo] = useState(null);
  const [message, setMessage] = useState("");

  const fetchTodos = async () => {
    try {
      const response = await fetch("https://api.npoint.io/fb001823132110e7add3");
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
        `https://api.npoint.io/fb001823132110e7add3/${todo.id}`,
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
    <div className="delete-todo-container">
      <h2 className="delete-todo-title">Delete Todo</h2>
      {message && <p className="delete-todo-message">{message}</p>}
      <ul className="delete-todo-list">
        {todos.map((todo) => (
          <li key={todo.id} className="delete-todo-item">
            {deletingTodo && deletingTodo.id === todo.id ? (
              <div className="delete-confirmation">
                <span className="delete-todo-confirm-message">
                  Are you sure you want to delete "{todo.name}"?
                </span>
                <button
                  type="button"
                  className="delete-todo-yes-button"
                  onClick={() => handleDelete(todo)}
                >
                  Yes
                </button>
                <button
                  type="button"
                  className="delete-todo-no-button"
                  onClick={() => setDeletingTodo(null)}
                >
                  No
                </button>
              </div>
            ) : (
              <div className="delete-todo-content">
                <span className="delete-todo-name">{todo.name}</span>
                <button
                  type="button"
                  className="delete-todo-delete-button"
                  onClick={() => setDeletingTodo(todo)}
                >
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
