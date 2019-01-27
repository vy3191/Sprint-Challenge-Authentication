import React, { Component } from 'react'
import axios from 'axios';

export default class Users extends Component {
   state = {
     jokes:[]
   }
  componentDidMount() {
     const token = localStorage.getItem('jwt');
     const endpoint = 'http://localhost:3300/api/jokes';
     const options = {
         headers: {
           Authorization: token
         }
     };

     axios.get(endpoint, options)
          .then( response => {
             console.log(response.data);
             this.setState({
                jokes: response.data
             });
          })
          .catch(err=> {
               console.log(`errorMessage:`, err);
          })
  }
  render() {
    return (
      <div>
        <h1>List of Users</h1>
        <ul>
          {
            this.state.jokes.map( joke => (
               <li key={joke.id}>{joke.joke}</li>
            ))
          }
        </ul>
      </div>
    )
  }
}
