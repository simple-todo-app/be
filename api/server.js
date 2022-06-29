const express = require('express');
var cors = require('cors');
const server = express();

server.use(express.json());
server.use(cors());

const authRouter = require('./auth/authRouter.js');
const tasksRouter = require('./tasks/tasksRouter.js');

server.get('/', (req, res) => {
  res.json({ message: 'Hello there!' })
});

server.use('/auth', authRouter);
server.use('/tasks', tasksRouter);

// Error handling
server.use((err, req, res, next) => { // eslint-disable-line
  res.status(err.status || 500).json({
    message: err.message,
    stack: err.stack,
  });
});

module.exports = server;