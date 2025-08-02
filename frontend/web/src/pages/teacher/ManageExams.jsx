import React, { useState, useEffect } from 'react';

const ManageExams = () => {
  const [exams, setExams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    class: '',
    subject: '',
    examDate: '',
    startTime: '',
    endTime: '',
    totalMarks: '',
    passingMarks: ''
  });
  const [message, setMessage] = useState(null);

  // Mock data for classes and subjects
  const classes = [
    { id: 1, name: 'Class 10' },
    { id: 2, name: 'Class 9' },
    { id: 3, name: 'Class 8' }
  ];

  const subjects = [
    { id: 1, name: 'Mathematics' },
    { id: 2, name: 'Science' },
    { id: 3, name: 'English' },
    { id: 4, name: 'Social Studies' }
  ];

  // Mock exam data
  const mockExams = [
    {
      id: 1,
      name: 'Mid-Term Examination',
      class: 'Class 10',
      subject: 'Mathematics',
      examDate: '2023-05-15',
      startTime: '09:00',
      endTime: '11:00',
      totalMarks: 100,
      passingMarks: 35
    },
    {
      id: 2,
      name: 'Weekly Test',
      class: 'Class 9',
      subject: 'Science',
      examDate: '2023-05-18',
      startTime: '10:00',
      endTime: '11:00',
      totalMarks: 50,
      passingMarks: 18
    },
    {
      id: 3,
      name: 'Final Examination',
      class: 'Class 10',
      subject: 'English',
      examDate: '2023-06-10',
      startTime: '09:00',
      endTime: '12:00',
      totalMarks: 100,
      passingMarks: 35
    }
  ];

  // Load exams
  useEffect(() => {
    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setExams(mockExams);
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
      !formData.class ||
      !formData.subject ||
      !formData.examDate ||
      !formData.startTime ||
      !formData.endTime ||
      !formData.totalMarks ||
      !formData.passingMarks
    ) {
      setMessage({ type: 'danger', text: 'Please fill all fields' });
      return;
    }
    
    // Create new exam
    const newExam = {
      id: exams.length + 1,
      ...formData,
      totalMarks: parseInt(formData.totalMarks),
      passingMarks: parseInt(formData.passingMarks)
    };
    
    // Simulate API call
    setLoading(true);
    setTimeout(() => {
      setExams([...exams, newExam]);
      setLoading(false);
      setShowForm(false);
      setFormData({
        name: '',
        class: '',
        subject: '',
        examDate: '',
        startTime: '',
        endTime: '',
        totalMarks: '',
        passingMarks: ''
      });
      setMessage({ type: 'success', text: 'Exam created successfully' });
    }, 500);
  };

  // Delete exam
  const deleteExam = (id) => {
    if (window.confirm('Are you sure you want to delete this exam?')) {
      setLoading(true);
      
      // Simulate API call
      setTimeout(() => {
        setExams(exams.filter(exam => exam.id !== id));
        setLoading(false);
        setMessage({ type: 'success', text: 'Exam deleted successfully' });
      }, 500);
    }
  };

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1>Manage Exams</h1>
        <button
          className="btn btn-primary"
          onClick={() => setShowForm(!showForm)}
        >
          {showForm ? 'Cancel' : 'Add New Exam'}
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
            <h4 className="mb-0">Add New Exam</h4>
          </div>
          <div className="card-body">
            <form onSubmit={handleSubmit}>
              <div className="row">
                <div className="col-md-6 mb-3">
                  <label htmlFor="name" className="form-label">Exam Name</label>
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
                  <label htmlFor="class" className="form-label">Class</label>
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
                  <label htmlFor="subject" className="form-label">Subject</label>
                  <select
                    className="form-select"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select Subject</option>
                    {subjects.map(subject => (
                      <option key={subject.id} value={subject.name}>
                        {subject.name}
                      </option>
                    ))}
                  </select>
                </div>
                
                <div className="col-md-6 mb-3">
                  <label htmlFor="examDate" className="form-label">Exam Date</label>
                  <input
                    type="date"
                    className="form-control"
                    id="examDate"
                    name="examDate"
                    value={formData.examDate}
                    onChange={handleChange}
                    required
                  />
                </div>
                
                <div className="col-md-6 mb-3">
                  <label htmlFor="startTime" className="form-label">Start Time</label>
                  <input
                    type="time"
                    className="form-control"
                    id="startTime"
                    name="startTime"
                    value={formData.startTime}
                    onChange={handleChange}
                    required
                  />
                </div>
                
                <div className="col-md-6 mb-3">
                  <label htmlFor="endTime" className="form-label">End Time</label>
                  <input
                    type="time"
                    className="form-control"
                    id="endTime"
                    name="endTime"
                    value={formData.endTime}
                    onChange={handleChange}
                    required
                  />
                </div>
                
                <div className="col-md-6 mb-3">
                  <label htmlFor="totalMarks" className="form-label">Total Marks</label>
                  <input
                    type="number"
                    className="form-control"
                    id="totalMarks"
                    name="totalMarks"
                    value={formData.totalMarks}
                    onChange={handleChange}
                    required
                  />
                </div>
                
                <div className="col-md-6 mb-3">
                  <label htmlFor="passingMarks" className="form-label">Passing Marks</label>
                  <input
                    type="number"
                    className="form-control"
                    id="passingMarks"
                    name="passingMarks"
                    value={formData.passingMarks}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
              
              <button type="submit" className="btn btn-success" disabled={loading}>
                {loading ? 'Saving...' : 'Save Exam'}
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
            <h4 className="mb-0">Upcoming Exams</h4>
          </div>
          <div className="card-body">
            {exams.length === 0 ? (
              <div className="alert alert-info">
                No exams scheduled yet.
              </div>
            ) : (
              <div className="table-responsive">
                <table className="table table-hover">
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Class</th>
                      <th>Subject</th>
                      <th>Date</th>
                      <th>Time</th>
                      <th>Total Marks</th>
                      <th>Passing Marks</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {exams.map(exam => (
                      <tr key={exam.id}>
                        <td>{exam.name}</td>
                        <td>{exam.class}</td>
                        <td>{exam.subject}</td>
                        <td>{new Date(exam.examDate).toLocaleDateString()}</td>
                        <td>{exam.startTime} - {exam.endTime}</td>
                        <td>{exam.totalMarks}</td>
                        <td>{exam.passingMarks}</td>
                        <td>
                          <button
                            className="btn btn-sm btn-danger"
                            onClick={() => deleteExam(exam.id)}
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

export default ManageExams;
