import React, { Component } from 'react'

export default class Login extends Component {
  
  state = {
     username: '',
     password: ''
  }
  render() {
    return (
      <div>
        <from>
        <div>         
            <label htmlFor='username'>Username:</label>
            <input type='text' name='username'></input>
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
