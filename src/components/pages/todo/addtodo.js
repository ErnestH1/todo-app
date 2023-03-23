import { useState } from "react";

function AddTodo() {
  const [taskName, setTaskName] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    const response = fetch("https://example.com/api/todos", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: taskName }),
    })
      .then((response) => {
        if (response.ok) {
          setMessage("New task added successfully.");
          setTaskName("");
        } else {
          setMessage("Failed to add a new task.");
        }
      })
      .catch((error) => {
        setMessage("Failed to communicate with the server.");
      });
  };

  return (
    <div>
      <h2>Add Todo</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Task Name:{" "}
          <input
            type="text"
            value={taskName}
            onChange={(event) => setTaskName(event.target.value)}
          />
        </label>{" "}
        <button type="submit">Add Task</button>
      </form>
      <p>{message}</p>
    </div>
  );
}

export default AddTodo;