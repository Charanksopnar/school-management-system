const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

// Initialize Express app
const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Import routes
const authRoutes = require('./api/auth/auth.routes');
const studentRoutes = require('./api/student/student.routes');
const teacherRoutes = require('./api/teacher/teacher.routes');

// Use routes
app.use('/api/auth', authRoutes);
app.use('/api/students', studentRoutes);
app.use('/api/teachers', teacherRoutes);

// Root route
app.get('/', (req, res) => {
  res.send('School Management System API is running');
});

// Start server without MongoDB for demonstration
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT} (MongoDB connection disabled for demo)`);
});
