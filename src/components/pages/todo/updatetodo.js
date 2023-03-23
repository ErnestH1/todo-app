import { useEffect, useState } from "react";

function UpdateTodo() {
  const [todos, setTodos] = useState([]);
  const [editingTodo, setEditingTodo] = useState(null);
  const [updatedTaskName, setUpdatedTaskName] = useState("");
  const [message, setMessage] = useState("");

  const fetchTodos = () => {
    fetch("https://example.com/api/todos")
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
    fetch(`https://example.com/api/todos/${editingTodo.id}`, {
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
    <div>
      <h2>Update Todo</h2>
      {message && <p>{message}</p>}
      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>
            {editingTodo && editingTodo.id === todo.id ? (
              <form onSubmit={handleUpdate}>
                <input
                  type="text"
                  value={updatedTaskName}
                  onChange={(event) => setUpdatedTaskName(event.target.value)}
                />
                <button type="submit">Update</button>
                <button type="button" onClick={() => setEditingTodo(null)}>
                  Cancel
                </button>
              </form>
            ) : (
              <div>
                <span>{todo.name}</span>
                <button type="button" onClick={() => handleEdit(todo)}>
                  Edit
                </button>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default UpdateTodo;