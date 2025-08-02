const Teacher = require('../../models/Teacher');
const User = require('../../models/User');

// @desc    Get all teachers
// @route   GET /api/teachers
// @access  Private (Admin)
exports.getTeachers = async (req, res) => {
  try {
    const teachers = await Teacher.find()
      .populate({
        path: 'user',
        select: 'name email phone address'
      })
      .populate('classes.class');

    res.status(200).json({
      success: true,
      count: teachers.length,
      data: teachers
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Server Error'
    });
  }
};

// @desc    Get single teacher
// @route   GET /api/teachers/:id
// @access  Private (Admin, Teacher themselves)
exports.getTeacher = async (req, res) => {
  try {
    const teacher = await Teacher.findById(req.params.id)
      .populate({
        path: 'user',
        select: 'name email phone address'
      })
      .populate('classes.class');

    if (!teacher) {
      return res.status(404).json({
        success: false,
        message: 'Teacher not found'
      });
    }

    res.status(200).json({
      success: true,
      data: teacher
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Server Error'
    });
  }
};

// @desc    Create new teacher
// @route   POST /api/teachers
// @access  Private (Admin)
exports.createTeacher = async (req, res) => {
  try {
    const {
      name,
      email,
      password,
      phone,
      address,
      employeeId,
      qualification,
      experience,
      subjects,
      classes,
      joiningDate,
      salary,
      dateOfBirth,
      gender
    } = req.body;

    // Create user first
    const user = await User.create({
      name,
      email,
      password,
      role: 'teacher',
      phone,
      address
    });

    // Create teacher with user reference
    const teacher = await Teacher.create({
      user: user._id,
      employeeId,
      qualification,
      experience,
      subjects,
      classes,
      joiningDate,
      salary,
      dateOfBirth,
      gender
    });

    res.status(201).json({
      success: true,
      data: teacher
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Server Error'
    });
  }
};

// @desc    Update teacher
// @route   PUT /api/teachers/:id
// @access  Private (Admin)
exports.updateTeacher = async (req, res) => {
  try {
    let teacher = await Teacher.findById(req.params.id);

    if (!teacher) {
      return res.status(404).json({
        success: false,
        message: 'Teacher not found'
      });
    }

    teacher = await Teacher.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    res.status(200).json({
      success: true,
      data: teacher
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Server Error'
    });
  }
};

// @desc    Delete teacher
// @route   DELETE /api/teachers/:id
// @access  Private (Admin)
exports.deleteTeacher = async (req, res) => {
  try {
    const teacher = await Teacher.findById(req.params.id);

    if (!teacher) {
      return res.status(404).json({
        success: false,
        message: 'Teacher not found'
      });
    }

    await teacher.remove();

    res.status(200).json({
      success: true,
      data: {}
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Server Error'
    });
  }
};
