const express = require('express');
const router = express.Router();
const studentController = require('../controllers/studentController');

// Authentication routes
router.post('/student/login', studentController.login);

// Student routes
router.post('/student', studentController.createStudent);
router.get('/student/tasks', studentController.getTasks);
router.put('/student/tasks/:taskId', studentController.updateTaskStatus);

module.exports = router;
