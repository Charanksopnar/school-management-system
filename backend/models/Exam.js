const mongoose = require('mongoose');

const ExamSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please add exam name'],
    trim: true
  },
  class: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Class',
    required: true
  },
  subject: {
    type: String,
    required: [true, 'Please add subject']
  },
  examDate: {
    type: Date,
    required: [true, 'Please add exam date']
  },
  startTime: {
    type: String,
    required: [true, 'Please add start time']
  },
  endTime: {
    type: String,
    required: [true, 'Please add end time']
  },
  totalMarks: {
    type: Number,
    required: [true, 'Please add total marks']
  },
  passingMarks: {
    type: Number,
    required: [true, 'Please add passing marks']
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Exam', ExamSchema);
