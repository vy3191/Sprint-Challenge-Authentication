import React, { Component } from 'react';
import {NavLink, Route} from 'react-router-dom';
import './App.css';

import Home from './components/Home';
import Login from './components/Login';
import Jokes from './components/Users';
import Register from './components/Register';
import Header from './Styles/Header';
import Button from './Styles/Button';

class App extends Component {
  logout = (event) => {
    event.preventDefault();
    localStorage.removeItem('jwt');

 }
  render() {
    return (
      <div className="App">
      <Header>
         
          <nav>
            <NavLink to='/' exact>Home</NavLink>
            <NavLink to='/Login'>Log in</NavLink>
            <NavLink to='/Register'>Register</NavLink>
            <NavLink to='/Jokes'>Get Jokes</NavLink>
            
          </nav>
          <Button onClick={this.logout}>Singout</Button>
          </Header>  
          <main>
            <Route path='/' component={Home} exact></Route>
            <Route path='/Login' component={Login} exact></Route>
            <Route path='/Register' component={Register}></Route>
            <Route path='/Jokes' component={Jokes} exact></Route>
          </main>
          
         
       
      </div>
    );
  }
}

export default App;
