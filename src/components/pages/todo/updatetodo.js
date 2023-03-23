import { useEffect, useState } from "react";
import "./UpdateTodo.css";

function UpdateTodo() {
  const [todos, setTodos] = useState([]);
  const [editingTodo, setEditingTodo] = useState(null);
  const [updatedTaskName, setUpdatedTaskName] = useState("");
  const [message, setMessage] = useState("");

  const fetchTodos = () => {
    fetch("https://api.npoint.io/fb001823132110e7add3")
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("Failed to fetch tasks.");
        }
      })
      .then((todos) => {
        setTodos(todos);
      })
      .catch((error) => {
        setMessage("Failed to communicate with the server.");
      });
  };

  const handleEdit = (todo) => {
    setEditingTodo(todo);
    setUpdatedTaskName(todo.name);
  };

  const handleUpdate = (event) => {
    event.preventDefault();
    fetch(`https://api.npoint.io/fb001823132110e7add3/${editingTodo.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: updatedTaskName }),
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("Failed to update task.");
        }
      })
      .then((updatedTodo) => {
        setTodos(
          todos.map((todo) =>
            todo.id === updatedTodo.id ? updatedTodo : todo
          )
        );
        setEditingTodo(null);
        setMessage("Task updated successfully.");
      })
      .catch((error) => {
        setMessage("Failed to communicate with the server.");
      });
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  return (
    <div className="UpdateTodo">
      <h2>Update Todo</h2>
      {message && <p>{message}</p>}
      <ul>
        {todos.map((todo) => (
          <li key={todo.id} className="card">
            {editingTodo && editingTodo.id === todo.id ? (
              <form onSubmit={handleUpdate} className="card__item">
                <input
                  type="text"
                  value={updatedTaskName}
                  onChange={(event) => setUpdatedTaskName(event.target.value)}
                  className="card__text"
                />
                <button type="submit" className="card__button card__button--update">Update</button>
                <button type="button" onClick={() => setEditingTodo(null)} className="card__button card__button--cancel">
                  Cancel
                </button>
              </form>
            ) : (
              <div className="card__item">
                <span className="card__text">{todo.name}</span>
                <button type="button" onClick={() => handleEdit(todo)} className="card__button card__button--edit">Edit</button>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default UpdateTodo;
