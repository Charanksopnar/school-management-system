import React, { useState, useEffect } from 'react';

const ManageTeachers = () => {
  const [teachers, setTeachers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    phone: '',
    address: '',
    employeeId: '',
    qualification: '',
    experience: '',
    subjects: '',
    joiningDate: '',
    salary: '',
    dateOfBirth: '',
    gender: ''
  });
  const [message, setMessage] = useState(null);

  // Mock teacher data
  const mockTeachers = [
    {
      id: 1,
      name: 'John Smith',
      email: 'john.smith@example.com',
      phone: '123-456-7890',
      employeeId: 'T001',
      qualification: 'M.Sc., B.Ed.',
      experience: '5 years',
      subjects: 'Mathematics, Physics',
      joiningDate: '2018-06-15',
      salary: '45000',
      gender: 'Male'
    },
    {
      id: 2,
      name: 'Sarah Johnson',
      email: 'sarah.johnson@example.com',
      phone: '123-456-7891',
      employeeId: 'T002',
      qualification: 'M.A., B.Ed.',
      experience: '8 years',
      subjects: 'English, History',
      joiningDate: '2015-07-10',
      salary: '52000',
      gender: 'Female'
    },
    {
      id: 3,
      name: 'Robert Williams',
      email: 'robert.williams@example.com',
      phone: '123-456-7892',
      employeeId: 'T003',
      qualification: 'M.Sc., Ph.D.',
      experience: '10 years',
      subjects: 'Chemistry, Biology',
      joiningDate: '2013-08-20',
      salary: '60000',
      gender: 'Male'
    }
  ];

  // Load teachers
  useEffect(() => {
    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setTeachers(mockTeachers);
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
      !formData.email ||
      !formData.password ||
      !formData.employeeId ||
      !formData.qualification ||
      !formData.subjects ||
      !formData.salary
    ) {
      setMessage({ type: 'danger', text: 'Please fill all required fields' });
      return;
    }
    
    // Create new teacher
    const newTeacher = {
      id: teachers.length + 1,
      ...formData
    };
    
    // Simulate API call
    setLoading(true);
    setTimeout(() => {
      setTeachers([...teachers, newTeacher]);
      setLoading(false);
      setShowForm(false);
      setFormData({
        name: '',
        email: '',
        password: '',
        phone: '',
        address: '',
        employeeId: '',
        qualification: '',
        experience: '',
        subjects: '',
        joiningDate: '',
        salary: '',
        dateOfBirth: '',
        gender: ''
      });
      setMessage({ type: 'success', text: 'Teacher added successfully' });
    }, 500);
  };

  // Delete teacher
  const deleteTeacher = (id) => {
    if (window.confirm('Are you sure you want to delete this teacher?')) {
      setLoading(true);
      
      // Simulate API call
      setTimeout(() => {
        setTeachers(teachers.filter(teacher => teacher.id !== id));
        setLoading(false);
        setMessage({ type: 'success', text: 'Teacher deleted successfully' });
      }, 500);
    }
  };

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1>Manage Teachers</h1>
        <button
          className="btn btn-primary"
          onClick={() => setShowForm(!showForm)}
        >
          {showForm ? 'Cancel' : 'Add New Teacher'}
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
            <h4 className="mb-0">Add New Teacher</h4>
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
                  <label htmlFor="password" className="form-label">Password *</label>
                  <input
                    type="password"
                    className="form-control"
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
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
                  <label htmlFor="employeeId" className="form-label">Employee ID *</label>
                  <input
                    type="text"
                    className="form-control"
                    id="employeeId"
                    name="employeeId"
                    value={formData.employeeId}
                    onChange={handleChange}
                    required
                  />
                </div>
                
                <div className="col-md-6 mb-3">
                  <label htmlFor="qualification" className="form-label">Qualification *</label>
                  <input
                    type="text"
                    className="form-control"
                    id="qualification"
                    name="qualification"
                    value={formData.qualification}
                    onChange={handleChange}
                    required
                  />
                </div>
                
                <div className="col-md-6 mb-3">
                  <label htmlFor="experience" className="form-label">Experience</label>
                  <input
                    type="text"
                    className="form-control"
                    id="experience"
                    name="experience"
                    value={formData.experience}
                    onChange={handleChange}
                  />
                </div>
                
                <div className="col-md-6 mb-3">
                  <label htmlFor="subjects" className="form-label">Subjects *</label>
                  <input
                    type="text"
                    className="form-control"
                    id="subjects"
                    name="subjects"
                    value={formData.subjects}
                    onChange={handleChange}
                    required
                    placeholder="e.g. Mathematics, Physics"
                  />
                </div>
                
                <div className="col-md-6 mb-3">
                  <label htmlFor="joiningDate" className="form-label">Joining Date</label>
                  <input
                    type="date"
                    className="form-control"
                    id="joiningDate"
                    name="joiningDate"
                    value={formData.joiningDate}
                    onChange={handleChange}
                  />
                </div>
                
                <div className="col-md-6 mb-3">
                  <label htmlFor="salary" className="form-label">Salary *</label>
                  <input
                    type="number"
                    className="form-control"
                    id="salary"
                    name="salary"
                    value={formData.salary}
                    onChange={handleChange}
                    required
                  />
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
              </div>
              
              <button type="submit" className="btn btn-success" disabled={loading}>
                {loading ? 'Saving...' : 'Save Teacher'}
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
            <h4 className="mb-0">Teacher List</h4>
          </div>
          <div className="card-body">
            {teachers.length === 0 ? (
              <div className="alert alert-info">
                No teachers found.
              </div>
            ) : (
              <div className="table-responsive">
                <table className="table table-hover">
                  <thead>
                    <tr>
                      <th>Employee ID</th>
                      <th>Name</th>
                      <th>Email</th>
                      <th>Phone</th>
                      <th>Qualification</th>
                      <th>Subjects</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {teachers.map(teacher => (
                      <tr key={teacher.id}>
                        <td>{teacher.employeeId}</td>
                        <td>{teacher.name}</td>
                        <td>{teacher.email}</td>
                        <td>{teacher.phone || '-'}</td>
                        <td>{teacher.qualification}</td>
                        <td>{teacher.subjects}</td>
                        <td>
                          <button
                            className="btn btn-sm btn-danger"
                            onClick={() => deleteTeacher(teacher.id)}
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

export default ManageTeachers;
