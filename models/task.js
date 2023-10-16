const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  student: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Student',
    required: true, // Ensure that a student ID is required for each task
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  dueDate: {
    type: Date,
    required: true,
  },
  status: {
    type: String,
    enum: ['pending', 'completed', 'overdue'],
    default: 'pending',
  },
});

module.exports = mongoose.model('Task', taskSchema);
