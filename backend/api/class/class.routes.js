const express = require('express');
const {
  getClasses,
  getClass,
  createClass,
  updateClass,
  deleteClass
} = require('./class.controller');
const { protect, authorize } = require('../../middleware/auth');

const router = express.Router();

router
  .route('/')
  .get(protect, authorize('admin', 'teacher'), getClasses)
  .post(protect, authorize('admin'), createClass);

router
  .route('/:id')
  .get(protect, authorize('admin', 'teacher'), getClass)
  .put(protect, authorize('admin'), updateClass)
  .delete(protect, authorize('admin'), deleteClass);

module.exports = router;
