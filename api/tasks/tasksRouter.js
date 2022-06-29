const router = require('express').Router();
const Task = require('./tasksModel.js');
const { restricted } = require('../auth/authMiddle.js');

router.get('/', restricted, (req, res, next) => {
  Task.getAllTasks()
    .then(tasks => {
      res.json(tasks)
    }).catch(next)
})

router.get('/:id', restricted, (req, res, next) => {
  Task.getAllUserTasks(req.params.id)
    .then(tasks => {
      res.json(tasks)
    }).catch(next)
})

router.post('/', async (req, res, next) => {
  const { title, user_id } = req.body;
  if (!title) {
    res.status(404).json({ message: 'Please enter all required fields' });
  } else {
    res.status(201).json(
      await Task.postNewTask({title: title, user_id: user_id})
        .then(task => {
          res.json(task)
        }).catch(next)
    )
  }
})

router.delete('/:task_id', (req, res, next) => {
  Task.deleteTaskById(req.params.task_id)
    .then(task => {
      res.json(task)
    }).catch(next)
})

router.put('/:task_id', (req, res, next) => {
  const { completed } = req.body;

  if (completed === 1) {
    Task.toggleCompletedById(req.params.task_id, { completed: 1 })
    .then(task => {
      res.json(task)
    }).catch(next)
  } else {
    Task.toggleCompletedById(req.params.task_id, { completed: 0 })
    .then(task => {
      res.json(task)
    }).catch(next)
  }
  
})

module.exports = router;