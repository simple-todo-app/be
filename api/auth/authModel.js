const db = require('../db-config.js');

const getAllUsers = () => {
  return db('users')
    .select('users.user_id', 'users.email');
}

const getUserBy = (filter) => {
  return db('users').where(filter);
}

const getUserById = (id) => {
  return db('users').where('user_id', id).select('users.user_id', 'users.email');
}

const insertUser = async (user) => {
  return await db('users').insert(user, ['email', 'password']);
}

module.exports = {
  getAllUsers,
  getUserBy,
  getUserById,
  insertUser
}