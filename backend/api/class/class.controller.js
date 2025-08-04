const Class = require('../../models/Class');
const Student = require('../../models/Student');
const Teacher = require('../../models/Teacher');

// @desc    Get all classes
// @route   GET /api/classes
// @access  Private (Admin, Teacher)
exports.getClasses = async (req, res) => {
  try {
    const classes = await Class.find()
      .populate({
        path: 'classTeacher',
        populate: {
          path: 'user',
          select: 'name email phone'
        }
      })
      .populate('subjects.teacher', 'user')
      .populate({
        path: 'subjects.teacher',
        populate: {
          path: 'user',
          select: 'name'
        }
      });

    res.status(200).json({
      success: true,
      count: classes.length,
      data: classes
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Server Error'
    });
  }
};

// @desc    Get single class
// @route   GET /api/classes/:id
// @access  Private (Admin, Teacher)
exports.getClass = async (req, res) => {
  try {
    const classData = await Class.findById(req.params.id)
      .populate({
        path: 'classTeacher',
        populate: {
          path: 'user',
          select: 'name email phone'
        }
      })
      .populate('subjects.teacher', 'user')
      .populate({
        path: 'subjects.teacher',
        populate: {
          path: 'user',
          select: 'name'
        }
      });

    if (!classData) {
      return res.status(404).json({
        success: false,
        message: 'Class not found'
      });
    }

    // Get students count for this class
    const studentsCount = await Student.countDocuments({ class: req.params.id });

    // Get students by section
    const studentsBySection = {};
    for (const section of classData.sections) {
      const count = await Student.countDocuments({ 
        class: req.params.id, 
        section: section 
      });
      studentsBySection[section] = count;
    }

    res.status(200).json({
      success: true,
      data: {
        ...classData.toObject(),
        studentsCount,
        studentsBySection
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Server Error'
    });
  }
};

// @desc    Create new class
// @route   POST /api/classes
// @access  Private (Admin)
exports.createClass = async (req, res) => {
  try {
    const {
      name,
      sections,
      classTeacher,
      subjects,
      academicYear
    } = req.body;

    // Convert sections string to array if needed
    const sectionsArray = Array.isArray(sections) 
      ? sections 
      : sections.split(',').map(s => s.trim());

    // Convert subjects string to array if needed
    let subjectsArray = [];
    if (typeof subjects === 'string') {
      subjectsArray = subjects.split(',').map(s => ({ name: s.trim() }));
    } else if (Array.isArray(subjects)) {
      subjectsArray = subjects;
    }

    const classData = await Class.create({
      name,
      sections: sectionsArray,
      classTeacher,
      subjects: subjectsArray,
      academicYear
    });

    res.status(201).json({
      success: true,
      data: classData
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Server Error'
    });
  }
};

// @desc    Update class
// @route   PUT /api/classes/:id
// @access  Private (Admin)
exports.updateClass = async (req, res) => {
  try {
    let classData = await Class.findById(req.params.id);

    if (!classData) {
      return res.status(404).json({
        success: false,
        message: 'Class not found'
      });
    }

    // Convert sections string to array if needed
    if (req.body.sections && typeof req.body.sections === 'string') {
      req.body.sections = req.body.sections.split(',').map(s => s.trim());
    }

    // Convert subjects string to array if needed
    if (req.body.subjects && typeof req.body.subjects === 'string') {
      req.body.subjects = req.body.subjects.split(',').map(s => ({ name: s.trim() }));
    }

    classData = await Class.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    res.status(200).json({
      success: true,
      data: classData
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Server Error'
    });
  }
};

// @desc    Delete class
// @route   DELETE /api/classes/:id
// @access  Private (Admin)
exports.deleteClass = async (req, res) => {
  try {
    const classData = await Class.findById(req.params.id);

    if (!classData) {
      return res.status(404).json({
        success: false,
        message: 'Class not found'
      });
    }

    // Check if there are students in this class
    const studentsCount = await Student.countDocuments({ class: req.params.id });
    if (studentsCount > 0) {
      return res.status(400).json({
        success: false,
        message: `Cannot delete class. There are ${studentsCount} students enrolled in this class.`
      });
    }

    await classData.remove();

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
