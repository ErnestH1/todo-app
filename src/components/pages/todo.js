import { useEffect, useState } from "react";
import './Todo.css';

function Todo() {
  const [tasks, setTasks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await fetch("https://api.npoint.io/fb001823132110e7add3");
        if (!response.ok) {
          throw new Error("Failed to fetch tasks.");
        }
        const data = await response.json();
        setTasks(data);
        setTimeout(() => {
          setIsLoading(false);
        }, 1000); // set loading to false after 1 second
      } catch (error) {
        console.error(error);
      }
    };
    fetchTasks();
  }, []);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (tasks.length === 0) {
    return <p>No tasks found.</p>;
  }

  return (
    <div className="todo-container">
      <h2>Todo List</h2>
      <ul className="task-list">
        {tasks.map((task) => (
          <li key={task.id} className="task-item">{task.name}</li>
        ))}
      </ul>
    </div>
  );
}

export default Todo;
