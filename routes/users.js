// Route to create users
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userControler')
const { check } = require('express-validator')

// Create user
// api/users
router.post('/', 
    [
    check('email', 'Email is required').isEmail()
    ],    
    userController.createUser)

// Get all user
router.get('/', userController.getUsers) 
// Get tasks by user ID
router.get('/:user_id/tasks', userController.getTaskByUserId)
// Get a single user by ID
router.get('/:user_id', userController.getUser)

module.exports = router;