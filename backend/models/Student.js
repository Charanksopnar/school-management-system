const mongoose = require('mongoose');

const StudentSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  rollNumber: {
    type: String,
    required: [true, 'Please add a roll number'],
    unique: true,
    trim: true,
    maxlength: [20, 'Roll number cannot be more than 20 characters']
  },
  class: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Class',
    required: true
  },
  section: {
    type: String,
    required: [true, 'Please add a section'],
    trim: true
  },
  admissionDate: {
    type: Date,
    default: Date.now
  },
  dateOfBirth: {
    type: Date,
    required: [true, 'Please add date of birth']
  },
  gender: {
    type: String,
    required: [true, 'Please add gender'],
    enum: ['Male', 'Female', 'Other']
  },
  bloodGroup: {
    type: String,
    enum: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-', 'Unknown'],
    default: 'Unknown'
  },
  parentInfo: {
    fatherName: {
      type: String,
      required: [true, 'Please add father name']
    },
    motherName: {
      type: String,
      required: [true, 'Please add mother name']
    },
    parentContact: {
      type: String,
      required: [true, 'Please add parent contact number']
    },
    parentEmail: {
      type: String
    }
  },
  attendance: [{
    date: {
      type: Date,
      required: true
    },
    status: {
      type: String,
      enum: ['Present', 'Absent', 'Late', 'Excused'],
      required: true
    },
    remark: String
  }],
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Student', StudentSchema);
