import React, { useState, useEffect } from 'react';

const ManageStudents = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingStudent, setEditingStudent] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    phone: '',
    address: '',
    rollNumber: '',
    class: '',
    section: '',
    dateOfBirth: '',
    gender: '',
    bloodGroup: '',
    fatherName: '',
    motherName: '',
    parentContact: '',
    parentEmail: ''
  });
  const [message, setMessage] = useState(null);

  // Mock data for classes
  const classes = [
    { id: 1, name: 'Class 10' },
    { id: 2, name: 'Class 9' },
    { id: 3, name: 'Class 8' }
  ];

  // Mock data for sections
  const sections = [
    { id: 1, name: 'A' },
    { id: 2, name: 'B' },
    { id: 3, name: 'C' }
  ];

  // Mock student data
  const mockStudents = [
    {
      id: 1,
      name: 'John Doe',
      email: 'john@example.com',
      phone: '123-456-7890',
      rollNumber: '10A01',
      class: 'Class 10',
      section: 'A',
      dateOfBirth: '2005-05-15',
      gender: 'Male',
      fatherName: 'Robert Doe',
      motherName: 'Sarah Doe',
      parentContact: '987-654-3210'
    },
    {
      id: 2,
      name: 'Jane Smith',
      email: 'jane@example.com',
      phone: '123-456-7891',
      rollNumber: '10A02',
      class: 'Class 10',
      section: 'A',
      dateOfBirth: '2005-06-20',
      gender: 'Female',
      fatherName: 'Michael Smith',
      motherName: 'Emily Smith',
      parentContact: '987-654-3211'
    },
    {
      id: 3,
      name: 'Michael Johnson',
      email: 'michael@example.com',
      phone: '123-456-7892',
      rollNumber: '9B01',
      class: 'Class 9',
      section: 'B',
      dateOfBirth: '2006-03-10',
      gender: 'Male',
      fatherName: 'David Johnson',
      motherName: 'Lisa Johnson',
      parentContact: '987-654-3212'
    }
  ];

  // Load students
  useEffect(() => {
    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setStudents(mockStudents);
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

    // Validate form (password not required for edit)
    const requiredFields = editingStudent
      ? ['name', 'email', 'rollNumber', 'class', 'section']
      : ['name', 'email', 'password', 'rollNumber', 'class', 'section'];

    const missingFields = requiredFields.filter(field => !formData[field]);

    if (missingFields.length > 0) {
      setMessage({ type: 'danger', text: 'Please fill all required fields' });
      return;
    }

    // Simulate API call
    setLoading(true);
    setTimeout(() => {
      if (editingStudent) {
        // Update existing student
        const updatedStudents = students.map(student =>
          student.id === editingStudent.id
            ? { ...student, ...formData }
            : student
        );
        setStudents(updatedStudents);
        setMessage({ type: 'success', text: 'Student updated successfully' });
      } else {
        // Create new student
        const newStudent = {
          id: students.length + 1,
          ...formData
        };
        setStudents([...students, newStudent]);
        setMessage({ type: 'success', text: 'Student added successfully' });
      }

      setLoading(false);
      cancelEdit();
    }, 500);
  };

  // Delete student
  const deleteStudent = (id) => {
    if (window.confirm('Are you sure you want to delete this student?')) {
      setLoading(true);

      // Simulate API call
      setTimeout(() => {
        setStudents(students.filter(student => student.id !== id));
        setLoading(false);
        setMessage({ type: 'success', text: 'Student deleted successfully' });
      }, 500);
    }
  };

  // Edit student
  const editStudent = (student) => {
    setEditingStudent(student);
    setFormData({
      name: student.name,
      email: student.email,
      password: '',
      phone: student.phone || '',
      address: student.address || '',
      rollNumber: student.rollNumber,
      class: student.class,
      section: student.section,
      dateOfBirth: student.dateOfBirth || '',
      gender: student.gender || '',
      bloodGroup: student.bloodGroup || '',
      fatherName: student.fatherName || '',
      motherName: student.motherName || '',
      parentContact: student.parentContact || '',
      parentEmail: student.parentEmail || ''
    });
    setShowForm(true);
  };

  // Cancel edit
  const cancelEdit = () => {
    setEditingStudent(null);
    setShowForm(false);
    setFormData({
      name: '',
      email: '',
      password: '',
      phone: '',
      address: '',
      rollNumber: '',
      class: '',
      section: '',
      dateOfBirth: '',
      gender: '',
      bloodGroup: '',
      fatherName: '',
      motherName: '',
      parentContact: '',
      parentEmail: ''
    });
  };

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1>Manage Students</h1>
        <button
          className="btn btn-primary"
          onClick={() => showForm ? cancelEdit() : setShowForm(true)}
        >
          {showForm ? 'Cancel' : 'Add New Student'}
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
            <h4 className="mb-0">{editingStudent ? 'Edit Student' : 'Add New Student'}</h4>
          </div>
          <div className="card-body">
            <form onSubmit={handleSubmit}>
              <div className="row">
                <div className="col-md-6 mb-3">
                  <label htmlFor="name" className="form-label">Full Name *</label>
                  <input
                    type="text"
                    className="form-control"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>
                
                <div className="col-md-6 mb-3">
                  <label htmlFor="email" className="form-label">Email *</label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>
                
                <div className="col-md-6 mb-3">
                  <label htmlFor="password" className="form-label">
                    Password {editingStudent ? '(leave blank to keep current)' : '*'}
                  </label>
                  <input
                    type="password"
                    className="form-control"
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    required={!editingStudent}
                    placeholder={editingStudent ? 'Leave blank to keep current password' : ''}
                  />
                </div>
                
                <div className="col-md-6 mb-3">
                  <label htmlFor="phone" className="form-label">Phone</label>
                  <input
                    type="text"
                    className="form-control"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                  />
                </div>
                
                <div className="col-md-6 mb-3">
                  <label htmlFor="rollNumber" className="form-label">Roll Number *</label>
                  <input
                    type="text"
                    className="form-control"
                    id="rollNumber"
                    name="rollNumber"
                    value={formData.rollNumber}
                    onChange={handleChange}
                    required
                  />
                </div>
                
                <div className="col-md-6 mb-3">
                  <label htmlFor="class" className="form-label">Class *</label>
                  <select
                    className="form-select"
                    id="class"
                    name="class"
                    value={formData.class}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select Class</option>
                    {classes.map(cls => (
                      <option key={cls.id} value={cls.name}>
                        {cls.name}
                      </option>
                    ))}
                  </select>
                </div>
                
                <div className="col-md-6 mb-3">
                  <label htmlFor="section" className="form-label">Section *</label>
                  <select
                    className="form-select"
                    id="section"
                    name="section"
                    value={formData.section}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select Section</option>
                    {sections.map(section => (
                      <option key={section.id} value={section.name}>
                        {section.name}
                      </option>
                    ))}
                  </select>
                </div>
                
                <div className="col-md-6 mb-3">
                  <label htmlFor="dateOfBirth" className="form-label">Date of Birth</label>
                  <input
                    type="date"
                    className="form-control"
                    id="dateOfBirth"
                    name="dateOfBirth"
                    value={formData.dateOfBirth}
                    onChange={handleChange}
                  />
                </div>
                
                <div className="col-md-6 mb-3">
                  <label htmlFor="gender" className="form-label">Gender</label>
                  <select
                    className="form-select"
                    id="gender"
                    name="gender"
                    value={formData.gender}
                    onChange={handleChange}
                  >
                    <option value="">Select Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                
                <div className="col-md-6 mb-3">
                  <label htmlFor="fatherName" className="form-label">Father's Name</label>
                  <input
                    type="text"
                    className="form-control"
                    id="fatherName"
                    name="fatherName"
                    value={formData.fatherName}
                    onChange={handleChange}
                  />
                </div>
                
                <div className="col-md-6 mb-3">
                  <label htmlFor="motherName" className="form-label">Mother's Name</label>
                  <input
                    type="text"
                    className="form-control"
                    id="motherName"
                    name="motherName"
                    value={formData.motherName}
                    onChange={handleChange}
                  />
                </div>
                
                <div className="col-md-6 mb-3">
                  <label htmlFor="parentContact" className="form-label">Parent's Contact</label>
                  <input
                    type="text"
                    className="form-control"
                    id="parentContact"
                    name="parentContact"
                    value={formData.parentContact}
                    onChange={handleChange}
                  />
                </div>
                
                <div className="col-md-6 mb-3">
                  <label htmlFor="parentEmail" className="form-label">Parent's Email</label>
                  <input
                    type="email"
                    className="form-control"
                    id="parentEmail"
                    name="parentEmail"
                    value={formData.parentEmail}
                    onChange={handleChange}
                  />
                </div>
              </div>
              
              <button type="submit" className="btn btn-success" disabled={loading}>
                {loading ? 'Saving...' : (editingStudent ? 'Update Student' : 'Save Student')}
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
            <h4 className="mb-0">Student List</h4>
          </div>
          <div className="card-body">
            {students.length === 0 ? (
              <div className="alert alert-info">
                No students found.
              </div>
            ) : (
              <div className="table-responsive">
                <table className="table table-hover">
                  <thead>
                    <tr>
                      <th>Roll No.</th>
                      <th>Name</th>
                      <th>Class</th>
                      <th>Section</th>
                      <th>Email</th>
                      <th>Phone</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {students.map(student => (
                      <tr key={student.id}>
                        <td>{student.rollNumber}</td>
                        <td>{student.name}</td>
                        <td>{student.class}</td>
                        <td>{student.section}</td>
                        <td>{student.email}</td>
                        <td>{student.phone || '-'}</td>
                        <td>
                          <button
                            className="btn btn-sm btn-warning me-2"
                            onClick={() => editStudent(student)}
                          >
                            Edit
                          </button>
                          <button
                            className="btn btn-sm btn-danger"
                            onClick={() => deleteStudent(student.id)}
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
    </div>
  );
};

export default ManageStudents;
