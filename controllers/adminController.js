const Student = require('../models/student');
const Task = require('../models/task');
const Admin = require('../models/admin');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require("dotenv").config();


/************   ADMIN Controller  *************/

// Handle admin login
exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find the admin by email
    const admin = await Admin.findOne({ email });

    if (!admin) {
      return res.status(401).json({ message: 'Admin not found' });
    }

    // Compare the provided password with the hashed password in the database
    const isPasswordValid = await bcrypt.compare(password, admin.password);

    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid password' });
    }

    // Generate a JWT token for admin authentication
    const token = jwt.sign({ adminId: admin._id }, process.env.SECRET, {
      expiresIn: '1h', // Token expires in 1 hour
    });

    res.status(200).json({ token, adminId: admin._id, message: 'Admin login successful' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'An error occurred while logging in' });
  }
};

// Create a new student (for admin)
exports.createStudent = async (req, res) => {
  const { name, email, department, password } = req.body;

  try {
    // Check if a student with the same email already exists
    const existingStudent = await Student.findOne({ email });

    if (existingStudent) {
      return res.status(400).json({ message: 'A student with this email already exists' });
    }

    // Hash the password before saving it to the database
    const hashedPassword = await bcrypt.hash(password, 10);

    const newStudent = new Student({
      name,
      email,
      department,
      password: hashedPassword,
    });

    await newStudent.save();

    res.status(201).json({ message: 'Student created successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'An error occurred while creating the student' });
  }
};

// Create a new task (for admin)
exports.createTask = async (req, res) => {
  const { studentId, title, description, dueDate, status } = req.body;

  try {
    // Check if the student with the provided studentId exists
    const student = await Student.findById(studentId);

    if (!student) {
      return res.status(400).json({ message: 'Student not found' });
    }

    // Create a new task
    const newTask = new Task({
      student: studentId,
      title,
      description,
      dueDate,
      status,
    });

    await newTask.save();

    res.status(201).json({ message: 'Task created successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'An error occurred while creating the task' });
  }
};