import React, { useState, useEffect } from 'react';

const ManageClasses = () => {
  const [classes, setClasses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingClass, setEditingClass] = useState(null);
  const [showDetails, setShowDetails] = useState(false);
  const [selectedClass, setSelectedClass] = useState(null);
  const [editingTimetable, setEditingTimetable] = useState(false);
  const [timetableData, setTimetableData] = useState({});
  const [formData, setFormData] = useState({
    name: '',
    sections: '',
    classTeacher: '',
    subjects: '',
    academicYear: ''
  });
  const [message, setMessage] = useState(null);

  // Mock teacher data for dropdown
  const teachers = [
    { id: 1, name: 'John Smith' },
    { id: 2, name: 'Sarah Johnson' },
    { id: 3, name: 'Robert Williams' }
  ];

  // Mock class data
  const mockClasses = [
    {
      id: 1,
      name: 'Class 10',
      sections: 'A, B, C',
      classTeacher: 'John Smith',
      subjects: 'Mathematics, Physics, Chemistry, English, Social Studies',
      academicYear: '2023-2024',
      totalStudents: 85,
      studentsBySection: { A: 30, B: 28, C: 27 },
      capacity: 90,
      timetable: {
        Monday: ['Math', 'Physics', 'English', 'Chemistry', 'Social Studies'],
        Tuesday: ['Physics', 'Math', 'Chemistry', 'English', 'Computer'],
        Wednesday: ['English', 'Social Studies', 'Math', 'Physics', 'Chemistry'],
        Thursday: ['Chemistry', 'English', 'Math', 'Social Studies', 'Physics'],
        Friday: ['Social Studies', 'Math', 'Physics', 'English', 'Chemistry']
      }
    },
    {
      id: 2,
      name: 'Class 9',
      sections: 'A, B',
      classTeacher: 'Sarah Johnson',
      subjects: 'Mathematics, Physics, Chemistry, English, Social Studies',
      academicYear: '2023-2024',
      totalStudents: 58,
      studentsBySection: { A: 30, B: 28 },
      capacity: 60,
      timetable: {
        Monday: ['Math', 'English', 'Physics', 'Chemistry', 'Social Studies'],
        Tuesday: ['English', 'Math', 'Chemistry', 'Physics', 'Computer'],
        Wednesday: ['Physics', 'Social Studies', 'Math', 'English', 'Chemistry'],
        Thursday: ['Chemistry', 'Math', 'English', 'Social Studies', 'Physics'],
        Friday: ['Social Studies', 'Physics', 'Math', 'English', 'Chemistry']
      }
    },
    {
      id: 3,
      name: 'Class 8',
      sections: 'A, B, C',
      classTeacher: 'Robert Williams',
      subjects: 'Mathematics, Science, English, Social Studies, Computer',
      academicYear: '2023-2024',
      totalStudents: 72,
      studentsBySection: { A: 25, B: 24, C: 23 },
      capacity: 75,
      timetable: {
        Monday: ['Math', 'Science', 'English', 'Social Studies', 'Computer'],
        Tuesday: ['Science', 'Math', 'English', 'Computer', 'Social Studies'],
        Wednesday: ['English', 'Social Studies', 'Math', 'Science', 'Computer'],
        Thursday: ['Computer', 'English', 'Math', 'Social Studies', 'Science'],
        Friday: ['Social Studies', 'Math', 'Science', 'English', 'Computer']
      }
    }
  ];

  // Load classes
  useEffect(() => {
    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setClasses(mockClasses);
      setLoading(false);
    }, 500);
  }, []);

  // Handle form input change
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate form
    if (
      !formData.name ||
      !formData.sections ||
      !formData.classTeacher ||
      !formData.subjects ||
      !formData.academicYear
    ) {
      setMessage({ type: 'danger', text: 'Please fill all fields' });
      return;
    }

    // Simulate API call
    setLoading(true);
    setTimeout(() => {
      if (editingClass) {
        // Update existing class
        const updatedClasses = classes.map(cls =>
          cls.id === editingClass.id
            ? { ...cls, ...formData }
            : cls
        );
        setClasses(updatedClasses);
        setMessage({ type: 'success', text: 'Class updated successfully' });
      } else {
        // Create new class
        const newClass = {
          id: classes.length + 1,
          ...formData
        };
        setClasses([...classes, newClass]);
        setMessage({ type: 'success', text: 'Class added successfully' });
      }

      setLoading(false);
      cancelEdit();
    }, 500);
  };

  // Delete class
  const deleteClass = (id) => {
    if (window.confirm('Are you sure you want to delete this class?')) {
      setLoading(true);

      // Simulate API call
      setTimeout(() => {
        setClasses(classes.filter(cls => cls.id !== id));
        setLoading(false);
        setMessage({ type: 'success', text: 'Class deleted successfully' });
      }, 500);
    }
  };

  // Edit class
  const editClass = (classData) => {
    setEditingClass(classData);
    setFormData({
      name: classData.name,
      sections: classData.sections,
      classTeacher: classData.classTeacher,
      subjects: classData.subjects,
      academicYear: classData.academicYear
    });
    setShowForm(true);
  };

  // Cancel edit
  const cancelEdit = () => {
    setEditingClass(null);
    setShowForm(false);
    setFormData({
      name: '',
      sections: '',
      classTeacher: '',
      subjects: '',
      academicYear: ''
    });
  };

  // View class details
  const viewDetails = (classData) => {
    setSelectedClass(classData);
    setShowDetails(true);
  };

  // Close details view
  const closeDetails = () => {
    setSelectedClass(null);
    setShowDetails(false);
    setEditingTimetable(false);
    setTimetableData({});
  };

  // Start editing timetable
  const startEditingTimetable = () => {
    if (selectedClass && selectedClass.timetable) {
      setTimetableData({ ...selectedClass.timetable });
    } else {
      // Initialize empty timetable
      const emptyTimetable = {};
      const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
      days.forEach(day => {
        emptyTimetable[day] = ['', '', '', '', ''];
      });
      setTimetableData(emptyTimetable);
    }
    setEditingTimetable(true);
  };

  // Cancel timetable editing
  const cancelTimetableEdit = () => {
    setEditingTimetable(false);
    setTimetableData({});
  };

  // Save timetable
  const saveTimetable = () => {
    // Update the selected class with new timetable
    const updatedClass = {
      ...selectedClass,
      timetable: timetableData
    };

    // Update the classes array
    const updatedClasses = classes.map(cls =>
      cls.id === selectedClass.id ? updatedClass : cls
    );

    setClasses(updatedClasses);
    setSelectedClass(updatedClass);
    setEditingTimetable(false);
    setMessage({ type: 'success', text: 'Timetable updated successfully' });
  };

  // Handle timetable cell change
  const handleTimetableChange = (day, periodIndex, value) => {
    setTimetableData(prev => ({
      ...prev,
      [day]: prev[day].map((subject, index) =>
        index === periodIndex ? value : subject
      )
    }));
  };

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1>Manage Classes</h1>
        <button
          className="btn btn-primary"
          onClick={() => showForm ? cancelEdit() : setShowForm(true)}
        >
          {showForm ? 'Cancel' : 'Add New Class'}
        </button>
      </div>

      {message && (
        <div className={`alert alert-${message.type} alert-dismissible fade show`} role="alert">
          {message.text}
          <button
            type="button"
            className="btn-close"
            onClick={() => setMessage(null)}
          ></button>
        </div>
      )}

      {showForm && (
        <div className="card mb-4">
          <div className="card-header bg-primary text-white">
            <h4 className="mb-0">{editingClass ? 'Edit Class' : 'Add New Class'}</h4>
          </div>
          <div className="card-body">
            <form onSubmit={handleSubmit}>
              <div className="row">
                <div className="col-md-6 mb-3">
                  <label htmlFor="name" className="form-label">Class Name</label>
                  <input
                    type="text"
                    className="form-control"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    placeholder="e.g. Class 10"
                  />
                </div>
                
                <div className="col-md-6 mb-3">
                  <label htmlFor="sections" className="form-label">Sections</label>
                  <input
                    type="text"
                    className="form-control"
                    id="sections"
                    name="sections"
                    value={formData.sections}
                    onChange={handleChange}
                    required
                    placeholder="e.g. A, B, C"
                  />
                </div>
                
                <div className="col-md-6 mb-3">
                  <label htmlFor="classTeacher" className="form-label">Class Teacher</label>
                  <select
                    className="form-select"
                    id="classTeacher"
                    name="classTeacher"
                    value={formData.classTeacher}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select Class Teacher</option>
                    {teachers.map(teacher => (
                      <option key={teacher.id} value={teacher.name}>
                        {teacher.name}
                      </option>
                    ))}
                  </select>
                </div>
                
                <div className="col-md-6 mb-3">
                  <label htmlFor="subjects" className="form-label">Subjects</label>
                  <input
                    type="text"
                    className="form-control"
                    id="subjects"
                    name="subjects"
                    value={formData.subjects}
                    onChange={handleChange}
                    required
                    placeholder="e.g. Mathematics, Physics, Chemistry"
                  />
                </div>
                
                <div className="col-md-6 mb-3">
                  <label htmlFor="academicYear" className="form-label">Academic Year</label>
                  <input
                    type="text"
                    className="form-control"
                    id="academicYear"
                    name="academicYear"
                    value={formData.academicYear}
                    onChange={handleChange}
                    required
                    placeholder="e.g. 2023-2024"
                  />
                </div>
              </div>
              
              <button type="submit" className="btn btn-success" disabled={loading}>
                {loading ? 'Saving...' : (editingClass ? 'Update Class' : 'Save Class')}
              </button>
            </form>
          </div>
        </div>
      )}

      {loading && !showForm ? (
        <div className="text-center py-5">
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      ) : (
        <div className="card">
          <div className="card-header bg-primary text-white">
            <h4 className="mb-0">Class List</h4>
          </div>
          <div className="card-body">
            {classes.length === 0 ? (
              <div className="alert alert-info">
                No classes found.
              </div>
            ) : (
              <div className="table-responsive">
                <table className="table table-hover">
                  <thead>
                    <tr>
                      <th>Class Name</th>
                      <th>Sections</th>
                      <th>Class Teacher</th>
                      <th>Subjects</th>
                      <th>Academic Year</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {classes.map(cls => (
                      <tr key={cls.id}>
                        <td>{cls.name}</td>
                        <td>{cls.sections}</td>
                        <td>{cls.classTeacher}</td>
                        <td>{cls.subjects}</td>
                        <td>{cls.academicYear}</td>
                        <td>
                          <button
                            className="btn btn-sm btn-info me-1"
                            onClick={() => viewDetails(cls)}
                          >
                            Details
                          </button>
                          <button
                            className="btn btn-sm btn-warning me-1"
                            onClick={() => editClass(cls)}
                          >
                            Edit
                          </button>
                          <button
                            className="btn btn-sm btn-danger"
                            onClick={() => deleteClass(cls.id)}
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Class Details Modal */}
      {showDetails && selectedClass && (
        <div className="modal show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog modal-lg">
            <div className="modal-content">
              <div className="modal-header bg-info text-white">
                <h5 className="modal-title">Class Details - {selectedClass.name}</h5>
                <button
                  type="button"
                  className="btn-close btn-close-white"
                  onClick={closeDetails}
                ></button>
              </div>
              <div className="modal-body">
                <div className="row">
                  <div className="col-md-6">
                    <h6 className="text-primary">Basic Information</h6>
                    <table className="table table-sm">
                      <tbody>
                        <tr>
                          <td><strong>Class Name:</strong></td>
                          <td>{selectedClass.name}</td>
                        </tr>
                        <tr>
                          <td><strong>Sections:</strong></td>
                          <td>{selectedClass.sections}</td>
                        </tr>
                        <tr>
                          <td><strong>Class Teacher:</strong></td>
                          <td>{selectedClass.classTeacher}</td>
                        </tr>
                        <tr>
                          <td><strong>Academic Year:</strong></td>
                          <td>{selectedClass.academicYear}</td>
                        </tr>
                        <tr>
                          <td><strong>Total Students:</strong></td>
                          <td>{selectedClass.totalStudents}/{selectedClass.capacity}</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <div className="col-md-6">
                    <h6 className="text-primary">Students by Section</h6>
                    <table className="table table-sm">
                      <thead>
                        <tr>
                          <th>Section</th>
                          <th>Students</th>
                        </tr>
                      </thead>
                      <tbody>
                        {Object.entries(selectedClass.studentsBySection || {}).map(([section, count]) => (
                          <tr key={section}>
                            <td>Section {section}</td>
                            <td>{count}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                <div className="mt-4">
                  <h6 className="text-primary">Subjects</h6>
                  <p>{selectedClass.subjects}</p>
                </div>

                <div className="mt-4">
                  <h6 className="text-primary">
                    Weekly Timetable
                    {editingTimetable && <span className="badge bg-warning ms-2">Editing</span>}
                  </h6>
                  <div className="table-responsive">
                    <table className="table table-bordered table-sm">
                      <thead className="table-light">
                        <tr>
                          <th>Day</th>
                          <th>Period 1</th>
                          <th>Period 2</th>
                          <th>Period 3</th>
                          <th>Period 4</th>
                          <th>Period 5</th>
                        </tr>
                      </thead>
                      <tbody>
                        {editingTimetable ? (
                          // Editable timetable
                          ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'].map(day => (
                            <tr key={day}>
                              <td><strong>{day}</strong></td>
                              {[0, 1, 2, 3, 4].map(periodIndex => (
                                <td key={periodIndex}>
                                  <input
                                    type="text"
                                    className="form-control form-control-sm"
                                    value={timetableData[day] ? timetableData[day][periodIndex] || '' : ''}
                                    onChange={(e) => handleTimetableChange(day, periodIndex, e.target.value)}
                                    placeholder="Subject"
                                  />
                                </td>
                              ))}
                            </tr>
                          ))
                        ) : (
                          // Read-only timetable
                          selectedClass.timetable ? (
                            Object.entries(selectedClass.timetable).map(([day, periods]) => (
                              <tr key={day}>
                                <td><strong>{day}</strong></td>
                                {periods.map((subject, index) => (
                                  <td key={index}>{subject || '-'}</td>
                                ))}
                              </tr>
                            ))
                          ) : (
                            <tr>
                              <td colSpan="6" className="text-center text-muted">
                                No timetable available. Click "Edit Timetable" to create one.
                              </td>
                            </tr>
                          )
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
              <div className="modal-footer">
                {!editingTimetable && (
                  <button
                    type="button"
                    className="btn btn-primary me-2"
                    onClick={startEditingTimetable}
                  >
                    Edit Timetable
                  </button>
                )}
                {editingTimetable && (
                  <>
                    <button
                      type="button"
                      className="btn btn-success me-2"
                      onClick={saveTimetable}
                    >
                      Save Timetable
                    </button>
                    <button
                      type="button"
                      className="btn btn-warning me-2"
                      onClick={cancelTimetableEdit}
                    >
                      Cancel Edit
                    </button>
                  </>
                )}
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={closeDetails}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageClasses;
