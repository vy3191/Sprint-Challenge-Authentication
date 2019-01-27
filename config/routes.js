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
  //  if(!user.password.length<6) res.status(400).json({Message:`Password must be at least six characters`});
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
            });
     })
     .catch(err => {
        res.status(500).json({errMessage: `Failed to register at this time`});
     });
}


function login(req, res) {
  // implement user login
  const user = req.body;
   const submittedPassword = user.password;
   if(!user.username) res.status(400).json({Message: `Username required for login!`});
   if(!submittedPassword) res.status(400).json({Message: `Password required for login!`});
   
   db.findByUsername(user.username)
     .then( user => {
        if(!user) res.status(404).json({Message: `There is no user with this ${user.username} use name`});
        if(user && bcrypt.compareSync(submittedPassword, user.password)) {
            const token = newToken(user);
            user.token = token;
            res.status(200).json({token: token, id:user.id});
        } else {
            res.status(401).json({Message:`Invalid password or username`});
        }
     })
     .catch(err => {
         res.status(500).json({Message:`Failed to login at this time`});
     })
}

function getJokes(req, res) {
  console.log('Get jokes line 60', req.decoded);
  // const token = req.decoded.jti;
  const token = req.decoded.token;
  console.log('line 62', token);
  const requestOptions = {
    headers: {
           accept: 'application/json' ,
           Authorization:token
        },  
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
