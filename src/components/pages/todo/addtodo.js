import { useState } from "react";
import './AddTodo.css';

function AddTodo() {
  const [taskName, setTaskName] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    fetch("https://api.npoint.io/fb001823132110e7add3", {
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
    <div className="add-todo-container ">
      <h2>Add Todo</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Task Name:{" "}
          <input
            type="text"
            value={taskName}
            onChange={(event) => setTaskName(event.target.value)}
            className="task-name-input"
          />
        </label>{" "}
        <button type="submit" className="add-task-btn">Add Task</button>
      </form>
      <p className="message">{message}</p>
    </div>
  );
}

export default AddTodo;
