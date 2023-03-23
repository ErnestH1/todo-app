import React from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import LoginSignup from './components/auth/login';
import Home from './components/pages/home';
import Navbar from './components/navbar/navabr';
import Todo from './components/pages/todo';
import UpdateTodo from './components/pages/todo/updatetodo';
import AddTodo from './components/pages/todo/addtodo';
import DeleteTodo from './components/pages/todo/deletetodo';
import Logout from './components/auth/logout';

function App() {
  const isAuthenticated = false; // Change this to check if the user is authenticated

  const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route {...rest} render={(props) => (
      isAuthenticated === true
        ? <Component {...props} />
        : <Redirect to='/' />
    )} />
  )

  return (
    <div>
      <Router>
        <Navbar />
        <Switch>
          <Route exact path="/" component={LoginSignup} />
          <Route path="/signup" component={LoginSignup} />
          <PrivateRoute path="/home" component={Home} />
          <PrivateRoute path="/todo" component={Todo} />
          <PrivateRoute path="/addtodo" component={AddTodo} />
          <PrivateRoute path="/update" component={UpdateTodo} />
          <PrivateRoute path="/delete" component={DeleteTodo} />
          <PrivateRoute path="/logout" component={Logout} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
