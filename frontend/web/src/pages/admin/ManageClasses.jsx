import React, { useState, useEffect } from 'react';

const ManageClasses = () => {
  const [classes, setClasses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
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
      academicYear: '2023-2024'
    },
    {
      id: 2,
      name: 'Class 9',
      sections: 'A, B',
      classTeacher: 'Sarah Johnson',
      subjects: 'Mathematics, Physics, Chemistry, English, Social Studies',
      academicYear: '2023-2024'
    },
    {
      id: 3,
      name: 'Class 8',
      sections: 'A, B, C',
      classTeacher: 'Robert Williams',
      subjects: 'Mathematics, Science, English, Social Studies, Computer',
      academicYear: '2023-2024'
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
    
    // Create new class
    const newClass = {
      id: classes.length + 1,
      ...formData
    };
    
    // Simulate API call
    setLoading(true);
    setTimeout(() => {
      setClasses([...classes, newClass]);
      setLoading(false);
      setShowForm(false);
      setFormData({
        name: '',
        sections: '',
        classTeacher: '',
        subjects: '',
        academicYear: ''
      });
      setMessage({ type: 'success', text: 'Class added successfully' });
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

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1>Manage Classes</h1>
        <button
          className="btn btn-primary"
          onClick={() => setShowForm(!showForm)}
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
            <h4 className="mb-0">Add New Class</h4>
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
                {loading ? 'Saving...' : 'Save Class'}
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
    </div>
  );
};

export default ManageClasses;
