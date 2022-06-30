const db = require('../db-config.js');

const getAllTasks = () => {
  return db('tasks');
}

const getAllUserTasks = async (id) => {
  return await db('tasks as t').where('t.user_id', id);
}

const postNewTask = async (task) => {
  return await db('tasks').insert(task, ['title', 'user_id']);
}

const deleteTaskById = async (task_id) => {
  return db('tasks').where({ task_id }).del();
}

const toggleCompletedById = async (task_id, { completed }) => {
  return await db('tasks').where({ task_id }).update({ completed })
}

module.exports = {
  getAllTasks,
  getAllUserTasks,
  postNewTask,
  deleteTaskById,
  toggleCompletedById
}