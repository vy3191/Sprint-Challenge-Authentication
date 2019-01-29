import React, { Component } from 'react'
import axios from 'axios';

export default class Users extends Component {
   state = {
     jokes:[],
     areJokesLoading: true,
     areYouLoggedIn: false
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
                jokes: response.data,
                areJokesLoading: false,
                areYouLoggedIn: true

             });
          })
          .catch(err=> {
               console.log(`errorMessage:`, err);
               this.setState({
                 areYouLoggedIn: false,
                 areJokesLoading:false
               })
          })
  }
  render() {
    const status = this.state.areJokesLoading ? <h1>Wait....Loading..</h1> : <h1>Here you go..</h1>;
    return (
      <div>
        <h1>Jokes .. Jokes</h1>
         {status}
        <ul className='ul'>
          {
            this.state.jokes.map( joke => (
               <li key={joke.id} className='list'>{joke.joke}</li>
            ))
          }
        </ul>
      </div>
    )
  }
}
