import React from 'react';
import { Link } from 'react-router-dom';
import './navbar.css'

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light" style={{ backgroundColor: '#e3f2fd' }}>
      <div className="container-fluid">
        <Link className="navbar-brand mx-5" to="/">Home</Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item dropdown">
              <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                Todo
              </a>
              <ul className="dropdown-menu">
                <li><Link className="dropdown-item" to="/todo">Todo</Link></li>
                <li><Link className="dropdown-item" to="/addtodo">AddTodo</Link></li>
                <li><Link className="dropdown-item" to="/update">UpdateTodo</Link></li>
                <li><Link className="dropdown-item" to="/delete">DeleteTodo</Link></li>
              </ul>
            </li>
          </ul>
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link className="nav-link btn btn-danger mx-3" to="/logout" style={{ marginRight: '20px' }}>Logout</Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
