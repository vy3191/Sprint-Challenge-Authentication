import React, { Component } from 'react';
import {NavLink, Route} from 'react-router-dom';
import './App.css';

import Home from './components/Home';
import Login from './components/Login';
import Jokes from './components/Users';
import Register from './components/Register';

class App extends Component {
  logout = (event) => {
    event.preventDefault();
    localStorage.removeItem('jwt');

 }
  render() {
    return (
      <div className="App">
        <header className="App-header">
        <nav>
           <NavLink to='/' exact>Home</NavLink>
           <NavLink to='/Login'>Log in</NavLink>
           <NavLink to='/Register'>Register</NavLink>
           <NavLink to='/Jokes'>Jokes</NavLink>
          
        </nav>
        <main>
           <Route path='/' component={Home} exact></Route>
           <Route path='/Login' component={Login} exact></Route>
           <Route path='/Register' component={Register}></Route>
           <Route path='/Jokes' component={Jokes} exact></Route>
        </main>
        <button onClick={this.logout}>Singout</button>
        </header>
      </div>
    );
  }
}

export default App;
