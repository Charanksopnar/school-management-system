const mongoose = require('mongoose');

const ClassSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please add a class name'],
    trim: true,
    maxlength: [50, 'Class name cannot be more than 50 characters']
  },
  sections: [{
    type: String,
    required: [true, 'Please add at least one section']
  }],
  classTeacher: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Teacher'
  },
  subjects: [{
    name: {
      type: String,
      required: [true, 'Please add a subject name']
    },
    teacher: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Teacher'
    }
  }],
  academicYear: {
    type: String,
    required: [true, 'Please add academic year']
  },
  capacity: {
    type: Number,
    default: 30,
    min: [1, 'Capacity must be at least 1'],
    max: [100, 'Capacity cannot exceed 100']
  },
  room: {
    type: String,
    trim: true,
    maxlength: [20, 'Room number cannot be more than 20 characters']
  },
  timetable: {
    Monday: [{
      period: Number,
      subject: String,
      teacher: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Teacher'
      },
      startTime: String,
      endTime: String
    }],
    Tuesday: [{
      period: Number,
      subject: String,
      teacher: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Teacher'
      },
      startTime: String,
      endTime: String
    }],
    Wednesday: [{
      period: Number,
      subject: String,
      teacher: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Teacher'
      },
      startTime: String,
      endTime: String
    }],
    Thursday: [{
      period: Number,
      subject: String,
      teacher: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Teacher'
      },
      startTime: String,
      endTime: String
    }],
    Friday: [{
      period: Number,
      subject: String,
      teacher: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Teacher'
      },
      startTime: String,
      endTime: String
    }],
    Saturday: [{
      period: Number,
      subject: String,
      teacher: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Teacher'
      },
      startTime: String,
      endTime: String
    }]
  },
  isActive: {
    type: Boolean,
    default: true
  },
  description: {
    type: String,
    maxlength: [500, 'Description cannot be more than 500 characters']
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Update the updatedAt field before saving
ClassSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

// Update the updatedAt field before updating
ClassSchema.pre('findOneAndUpdate', function(next) {
  this.set({ updatedAt: Date.now() });
  next();
});

module.exports = mongoose.model('Class', ClassSchema);
