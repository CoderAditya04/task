const mongoose = require('mongoose');

const adminSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    default: 'admin@admin.com',
  },
  password: {
    type: String,
    required: true,
    default: 'admin',
  },
});

module.exports = mongoose.model('Admin', adminSchema);
