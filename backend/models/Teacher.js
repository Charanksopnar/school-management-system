const mongoose = require('mongoose');

const TeacherSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  employeeId: {
    type: String,
    required: [true, 'Please add an employee ID'],
    unique: true,
    trim: true,
    maxlength: [20, 'Employee ID cannot be more than 20 characters']
  },
  qualification: {
    type: String,
    required: [true, 'Please add qualification']
  },
  experience: {
    type: Number,
    default: 0
  },
  subjects: [{
    type: String,
    required: [true, 'Please add at least one subject']
  }],
  classes: [{
    class: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Class'
    },
    section: String
  }],
  joiningDate: {
    type: Date,
    default: Date.now
  },
  salary: {
    type: Number,
    required: [true, 'Please add salary']
  },
  dateOfBirth: {
    type: Date
  },
  gender: {
    type: String,
    enum: ['Male', 'Female', 'Other']
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Teacher', TeacherSchema);
