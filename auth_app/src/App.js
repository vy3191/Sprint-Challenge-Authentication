import React, { Component } from 'react';
import {NavLink, Route} from 'react-router-dom';
import './App.css';

import Home from './components/Home';
import Login from './components/Login';
import Users from './components/Users';
import Register from './components/Register';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
        <nav>
           <NavLink to='/' exact>Home</NavLink>
           <NavLink to='/Login'>Log in</NavLink>
           <NavLink to='/Register'>Register</NavLink>
           <NavLink to='/Users'>Users</NavLink>
        </nav>
        <main>
           <Route path='/' component={Home} exact></Route>
           <Route path='/Login' component={Login} exact></Route>
           <Route path='/Register' component={Register}></Route>
           <Route path='/Users' component={Users} exact></Route>
        </main>
        </header>
      </div>
    );
  }
}

export default App;
