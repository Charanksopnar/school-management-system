const express = require('express');
const {
  getStudents,
  getStudent,
  createStudent,
  updateStudent,
  deleteStudent
} = require('./student.controller');
const { protect, authorize } = require('../../middleware/auth');

const router = express.Router();

router
  .route('/')
  .get(protect, authorize('admin', 'teacher'), getStudents)
  .post(protect, authorize('admin'), createStudent);

router
  .route('/:id')
  .get(protect, getStudent)
  .put(protect, authorize('admin'), updateStudent)
  .delete(protect, authorize('admin'), deleteStudent);

module.exports = router;
