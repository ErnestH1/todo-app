import React from 'react';
import { Link } from 'react-router-dom';


const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container">
        <Link className="navbar-brand" to="/">Home</Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            
            <li class="nav-item dropdown">
          <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
            Todo
          </a>
          <ul class="dropdown-menu">
            <Link className="dropdown-item" to="/todo">Todo</Link>
            <Link className="dropdown-item" to="/addtodo">AddTodo</Link>
            <Link className="dropdown-item" to="/update">UpdateTodo</Link>
            <Link className="dropdown-item" to="/delete">DeleteTodo</Link>
            
          </ul>

        </li>
        <li className="nav-item">
              <Link className="nav-link" to="/logout">Logout</Link>
            </li>

          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
