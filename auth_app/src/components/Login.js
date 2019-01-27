import React, { Component } from 'react'
import axios from 'axios';

export default class Login extends Component {
  
  state = {
     username: '',
     password: ''
  }
  handleInput = (event) => {
     const target = event.target;
     this.setState({
        [target.name] : target.value
     })
  }
  handleSubmit = (event) => {
     event.preventDefault();
     const credentials = this.state;
     const endpoint = 'http://localhost:3300/api/login';
     axios.post(endpoint, credentials)
          .then(response => {
             localStorage.setItem('jwt', response.data.token);
          })
          .catch(err => {
             console.log(`errorMessage: `, err);
          });
      this.setState({
         username: '',
         password:''
      })    
  }  
  render() {
    return (
      <div>
        <from>
        <div>         
            <label htmlFor='username'>Username:</label>
            <input type='text' name='username'
                   value={this.state.username}></input>
         </div>
         <div>
            <label htmlFor='password'>Password:</label>
            <input type='text' name='password'></input>
         </div>
         <div>
           <button type='submit'>Sign In</button>
         </div>
       </from>
      </div>
    )
  }
}
