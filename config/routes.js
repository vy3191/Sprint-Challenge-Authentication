const axios = require('axios');
const bcrypt = require('bcryptjs');
const db = require('../Helper/dbHelper');
const { authenticate ,newToken } = require('../auth/authenticate');

module.exports = server => {
  server.post('/api/register', register);
  server.post('/api/login', login);
  server.get('/api/jokes', authenticate, getJokes);
};

function register(req, res) {
  // implement user registration
   const user = req.body;
   if(!user.username) res.status(400).json({Message: `User name is required for registration`});
   if(!user.password) res.status(400).json({Message: `Password is required for registration`});
   const hash = bcrypt.hashSync(user.password, 10);
   user.password = hash;
   db.insertUser(user)
     .then( ids => {
         const id = ids[0];
         db.findById(id)
           .then( user => {
              if(!user) res.status(404).json({Message:`There is no user with this userID${id}`});
              const token = newToken(user);
              res.status(201).json({token: token, id: user.id});
           })
            .catch(err => {
               res.status(500).json({errMessage: `Something went wrong`});
            })
     })
     .catch(err => {
        res.status(500).json({errMessage: `Failed to register at this time`});
     })
}


function login(req, res) {
  // implement user login
}

function getJokes(req, res) {
  const requestOptions = {
    headers: { accept: 'application/json' },
  };

  axios
    .get('https://icanhazdadjoke.com/search', requestOptions)
    .then(response => {
      res.status(200).json(response.data.results);
    })
    .catch(err => {
      res.status(500).json({ message: 'Error Fetching Jokes', error: err });
    });
}
