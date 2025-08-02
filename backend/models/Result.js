const mongoose = require('mongoose');

const ResultSchema = new mongoose.Schema({
  student: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Student',
    required: true
  },
  exam: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Exam',
    required: true
  },
  marksObtained: {
    type: Number,
    required: [true, 'Please add marks obtained']
  },
  grade: {
    type: String
  },
  remarks: {
    type: String
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Calculate grade based on marks
ResultSchema.pre('save', function(next) {
  const percentage = (this.marksObtained / this.exam.totalMarks) * 100;
  
  if (percentage >= 90) {
    this.grade = 'A+';
  } else if (percentage >= 80) {
    this.grade = 'A';
  } else if (percentage >= 70) {
    this.grade = 'B+';
  } else if (percentage >= 60) {
    this.grade = 'B';
  } else if (percentage >= 50) {
    this.grade = 'C';
  } else if (percentage >= 40) {
    this.grade = 'D';
  } else {
    this.grade = 'F';
  }
  
  next();
});

module.exports = mongoose.model('Result', ResultSchema);
