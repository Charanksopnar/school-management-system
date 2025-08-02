const mongoose = require('mongoose');

const FeeSchema = new mongoose.Schema({
  student: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Student',
    required: true
  },
  feeType: {
    type: String,
    required: [true, 'Please add fee type'],
    enum: ['Tuition', 'Transportation', 'Examination', 'Library', 'Laboratory', 'Other']
  },
  amount: {
    type: Number,
    required: [true, 'Please add amount']
  },
  dueDate: {
    type: Date,
    required: [true, 'Please add due date']
  },
  status: {
    type: String,
    enum: ['Paid', 'Unpaid', 'Partial'],
    default: 'Unpaid'
  },
  paidAmount: {
    type: Number,
    default: 0
  },
  paymentDate: {
    type: Date
  },
  paymentMethod: {
    type: String,
    enum: ['Cash', 'Cheque', 'Online Transfer', 'Credit Card', 'Debit Card', 'Other']
  },
  receiptNumber: {
    type: String
  },
  academicYear: {
    type: String,
    required: [true, 'Please add academic year']
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Fee', FeeSchema);
