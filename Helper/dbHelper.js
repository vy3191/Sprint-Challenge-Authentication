const dbConfig = require('../knexfile');
const db = knex(dbConfig.development);

function insertUser(user) {
     return db('users').insert(user);
};

function findByUsername(username) {
    return db('users').where('username', username).first();
};

function findById(id) {
  return db('users').where('id', id).first();
};

function findUsers() {
   return db('users').select('id', username);
};

module.exports = {
   insertUser, findByUsername, findById, findUsers
}

