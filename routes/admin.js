const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');

// Authentication routes
router.post('/admin/login', adminController.login);

// Admin routes
router.post('/admin/students', adminController.createStudent);
router.post('/admin/tasks', adminController.createTask);

module.exports = router;
