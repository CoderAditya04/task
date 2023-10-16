const Student = require('../models/student');
const Task = require('../models/task');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require("dotenv").config();


/**********   STUDENT Controller  *************/

// Handle student login
exports.studentLogin = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find the student by email
    const student = await Student.findOne({ email });

    if (!student) {
      return res.status(401).json({ message: 'Student not found' });
    }

    // Compare the provided password with the hashed password in the database
    const isPasswordValid = await bcrypt.compare(password, student.password);

    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid password' });
    }

    // Generate a JWT token for authentication
    const token = jwt.sign({ studentId: student._id }, process.env.SECRET, {
      expiresIn: '1h', // Token expires in 1 hour
    });

    res.status(200).json({ token, studentId: student._id, message: 'Login successful' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'An error occurred while logging in' });
  }
};


// Get tasks for a student
exports.getTasks = async (req, res) => {
  const studentId = req.studentId; // Assuming you have middleware to set req.studentId after authentication

  try {
    // Retrieve tasks for the authenticated student
    const tasks = await Task.find({ student: studentId });

    if (!tasks) {
      return res.status(404).json({ message: 'No tasks found for this student' });
    }

    res.status(200).json({ tasks });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'An error occurred while fetching tasks' });
  }
};

// Update task status for a student
exports.updateTaskStatus = async (req, res) => {
  const studentId = req.studentId; // Assuming you have middleware to set req.studentId after authentication
  const taskId = req.params.taskId;
  const { newStatus } = req.body;

  try {
    // Check if the task with taskId belongs to the authenticated student
    const task = await Task.findOne({ _id: taskId, student: studentId });

    if (!task) {
      return res.status(404).json({ message: 'Task not found for this student' });
    }

    // Update the task status
    task.status = newStatus;
    await task.save();

    res.status(200).json({ message: 'Task status updated successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'An error occurred while updating task status' });
  }
};