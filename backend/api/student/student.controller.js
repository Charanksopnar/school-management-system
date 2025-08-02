const Student = require('../../models/Student');
const User = require('../../models/User');

// @desc    Get all students
// @route   GET /api/students
// @access  Private (Admin, Teacher)
exports.getStudents = async (req, res) => {
  try {
    const students = await Student.find()
      .populate({
        path: 'user',
        select: 'name email phone address'
      })
      .populate('class');

    res.status(200).json({
      success: true,
      count: students.length,
      data: students
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Server Error'
    });
  }
};

// @desc    Get single student
// @route   GET /api/students/:id
// @access  Private (Admin, Teacher, Parent of the student, Student themselves)
exports.getStudent = async (req, res) => {
  try {
    const student = await Student.findById(req.params.id)
      .populate({
        path: 'user',
        select: 'name email phone address'
      })
      .populate('class');

    if (!student) {
      return res.status(404).json({
        success: false,
        message: 'Student not found'
      });
    }

    res.status(200).json({
      success: true,
      data: student
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Server Error'
    });
  }
};

// @desc    Create new student
// @route   POST /api/students
// @access  Private (Admin)
exports.createStudent = async (req, res) => {
  try {
    const {
      name,
      email,
      password,
      phone,
      address,
      rollNumber,
      classId,
      section,
      dateOfBirth,
      gender,
      bloodGroup,
      fatherName,
      motherName,
      parentContact,
      parentEmail
    } = req.body;

    // Create user first
    const user = await User.create({
      name,
      email,
      password,
      role: 'student',
      phone,
      address
    });

    // Create student with user reference
    const student = await Student.create({
      user: user._id,
      rollNumber,
      class: classId,
      section,
      dateOfBirth,
      gender,
      bloodGroup,
      parentInfo: {
        fatherName,
        motherName,
        parentContact,
        parentEmail
      }
    });

    res.status(201).json({
      success: true,
      data: student
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Server Error'
    });
  }
};

// @desc    Update student
// @route   PUT /api/students/:id
// @access  Private (Admin)
exports.updateStudent = async (req, res) => {
  try {
    let student = await Student.findById(req.params.id);

    if (!student) {
      return res.status(404).json({
        success: false,
        message: 'Student not found'
      });
    }

    student = await Student.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    res.status(200).json({
      success: true,
      data: student
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Server Error'
    });
  }
};

// @desc    Delete student
// @route   DELETE /api/students/:id
// @access  Private (Admin)
exports.deleteStudent = async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);

    if (!student) {
      return res.status(404).json({
        success: false,
        message: 'Student not found'
      });
    }

    await student.remove();

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
