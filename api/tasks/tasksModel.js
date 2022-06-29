const db = require('../db-config.js');

const getAllTasks = () => {
  return db('tasks');
}

const getAllUserTasks = async (id) => {
  const result = await db('tasks as t')
    .where('t.user_id', id)

  return result;
}

const postNewTask = async (task) => {
  const [result] = await db('tasks').insert(task)

  return db('tasks as t').where('t.task_id', result);
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