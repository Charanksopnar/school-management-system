const jwt = require('jsonwebtoken');

// Mock users for demo
const mockUsers = [
  {
    _id: '1',
    name: 'Admin User',
    email: 'admin@school.com',
    password: 'admin123',
    role: 'admin'
  },
  {
    _id: '2',
    name: 'Teacher User',
    email: 'teacher@school.com',
    password: 'teacher123',
    role: 'teacher'
  },
  {
    _id: '3',
    name: 'Student User',
    email: 'student@school.com',
    password: 'student123',
    role: 'student'
  },
  {
    _id: '4',
    name: 'Parent User',
    email: 'parent@school.com',
    password: 'parent123',
    role: 'parent'
  }
];

// @desc    Register user
// @route   POST /api/auth/register
// @access  Public
exports.register = async (req, res) => {
  try {
    const { name, email, password, role, phone, address } = req.body;

    // Check if user already exists
    const userExists = mockUsers.find(user => user.email === email);

    if (userExists) {
      return res.status(400).json({
        success: false,
        message: 'User already exists'
      });
    }

    // Create user (for demo)
    const newUser = {
      _id: (mockUsers.length + 1).toString(),
      name,
      email,
      password,
      role: role || 'student',
      phone,
      address
    };

    mockUsers.push(newUser);

    sendTokenResponse(newUser, 201, res);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Server Error'
    });
  }
};

// @desc    Login user
// @route   POST /api/auth/login
// @access  Public
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate email & password
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Please provide an email and password'
      });
    }

    // Check for user
    const user = mockUsers.find(user => user.email === email);

    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials'
      });
    }

    // Check if password matches
    if (password !== user.password) {
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials'
      });
    }

    sendTokenResponse(user, 200, res);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Server Error'
    });
  }
};

// @desc    Get current logged in user
// @route   GET /api/auth/me
// @access  Private
exports.getMe = async (req, res) => {
  try {
    // For demo, just return the user from the token
    const user = {
      _id: req.user.id,
      name: req.user.name,
      email: req.user.email,
      role: req.user.role
    };

    res.status(200).json({
      success: true,
      data: user
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Server Error'
    });
  }
};

// @desc    Logout user / clear cookie
// @route   GET /api/auth/logout
// @access  Private
exports.logout = async (req, res) => {
  res.status(200).json({
    success: true,
    message: 'User logged out successfully'
  });
};

// Get token from model, create cookie and send response
const sendTokenResponse = (user, statusCode, res) => {
  // Create token (for demo)
  const token = jwt.sign(
    {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role
    },
    process.env.JWT_SECRET || 'school_management_secret_key',
    { expiresIn: process.env.JWT_EXPIRE || '30d' }
  );

  res.status(statusCode).json({
    success: true,
    token,
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role
    }
  });
};
