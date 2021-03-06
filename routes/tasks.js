// Route to create users
const express = require('express');
const router = express.Router();
const tasksController = require('../controllers/taskController')


// Get Tasks
// api/tasks
router.get('/', tasksController.getTasks);
// Get a single task by user ID
router.get('/:user_id', tasksController.getTask);
// Get task by status
router.get('/status/:status', tasksController.getTaskByStatus);
module.exports = router;