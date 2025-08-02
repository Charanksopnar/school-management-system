import React, { useState, useEffect } from 'react';
import FileUpload from '../../components/common/FileUpload';

const ManageHomework = () => {
  const [homeworks, setHomeworks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    class: '',
    section: '',
    subject: '',
    dueDate: '',
    attachments: []
  });
  const [message, setMessage] = useState(null);
  const [viewSubmissions, setViewSubmissions] = useState(null);

  // Mock data for classes and sections
  const classes = [
    { id: 1, name: 'Class 10' },
    { id: 2, name: 'Class 9' },
    { id: 3, name: 'Class 8' }
  ];

  const sections = [
    { id: 1, name: 'A' },
    { id: 2, name: 'B' },
    { id: 3, name: 'C' }
  ];

  // Mock data for subjects
  const subjects = [
    { id: 1, name: 'Mathematics' },
    { id: 2, name: 'Science' },
    { id: 3, name: 'English' },
    { id: 4, name: 'Social Studies' }
  ];

  // Mock homework data
  const mockHomeworks = [
    {
      id: 1,
      title: 'Algebra Practice Problems',
      description: 'Complete problems 1-20 from Chapter 5',
      class: 'Class 10',
      section: 'A',
      subject: 'Mathematics',
      dueDate: '2023-06-15',
      assignedDate: '2023-06-08',
      attachments: [
        { name: 'algebra_problems.pdf', size: '1.2MB' }
      ],
      submissions: [
        { id: 1, student: 'John Doe', submissionDate: '2023-06-14', status: 'Submitted', file: 'john_algebra.pdf' },
        { id: 2, student: 'Jane Smith', submissionDate: '2023-06-13', status: 'Submitted', file: 'jane_algebra.pdf' },
        { id: 3, student: 'Michael Johnson', submissionDate: null, status: 'Pending', file: null }
      ]
    },
    {
      id: 2,
      title: 'Science Lab Report',
      description: 'Write a lab report on the photosynthesis experiment',
      class: 'Class 9',
      section: 'B',
      subject: 'Science',
      dueDate: '2023-06-20',
      assignedDate: '2023-06-10',
      attachments: [
        { name: 'lab_report_template.docx', size: '0.8MB' }
      ],
      submissions: [
        { id: 1, student: 'Emily Brown', submissionDate: '2023-06-18', status: 'Submitted', file: 'emily_lab.docx' },
        { id: 2, student: 'David Wilson', submissionDate: null, status: 'Pending', file: null }
      ]
    }
  ];

  // Load homeworks
  useEffect(() => {
    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setHomeworks(mockHomeworks);
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

  // Handle file selection
  const handleFileSelect = (file) => {
    setFormData({
      ...formData,
      attachments: [...formData.attachments, file]
    });
  };

  // Remove attachment
  const removeAttachment = (index) => {
    const updatedAttachments = [...formData.attachments];
    updatedAttachments.splice(index, 1);
    setFormData({
      ...formData,
      attachments: updatedAttachments
    });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validate form
    if (
      !formData.title ||
      !formData.class ||
      !formData.section ||
      !formData.subject ||
      !formData.dueDate
    ) {
      setMessage({ type: 'danger', text: 'Please fill all required fields' });
      return;
    }
    
    // Create new homework
    const newHomework = {
      id: homeworks.length + 1,
      ...formData,
      assignedDate: new Date().toISOString().split('T')[0],
      submissions: []
    };
    
    // Simulate API call
    setLoading(true);
    setTimeout(() => {
      setHomeworks([...homeworks, newHomework]);
      setLoading(false);
      setShowForm(false);
      setFormData({
        title: '',
        description: '',
        class: '',
        section: '',
        subject: '',
        dueDate: '',
        attachments: []
      });
      setMessage({ type: 'success', text: 'Homework assigned successfully' });
    }, 500);
  };

  // Delete homework
  const deleteHomework = (id) => {
    if (window.confirm('Are you sure you want to delete this homework?')) {
      setLoading(true);
      
      // Simulate API call
      setTimeout(() => {
        setHomeworks(homeworks.filter(homework => homework.id !== id));
        setLoading(false);
        setMessage({ type: 'success', text: 'Homework deleted successfully' });
      }, 500);
    }
  };

  // View homework submissions
  const showSubmissions = (homework) => {
    setViewSubmissions(homework);
  };

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1>Manage Homework</h1>
        <button
          className="btn btn-primary"
          onClick={() => setShowForm(!showForm)}
        >
          {showForm ? 'Cancel' : 'Assign New Homework'}
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
            <h4 className="mb-0">Assign New Homework</h4>
          </div>
          <div className="card-body">
            <form onSubmit={handleSubmit}>
              <div className="row">
                <div className="col-md-6 mb-3">
                  <label htmlFor="title" className="form-label">Title *</label>
                  <input
                    type="text"
                    className="form-control"
                    id="title"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    required
                  />
                </div>
                
                <div className="col-md-6 mb-3">
                  <label htmlFor="dueDate" className="form-label">Due Date *</label>
                  <input
                    type="date"
                    className="form-control"
                    id="dueDate"
                    name="dueDate"
                    value={formData.dueDate}
                    onChange={handleChange}
                    required
                  />
                </div>
                
                <div className="col-md-4 mb-3">
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
                
                <div className="col-md-4 mb-3">
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
                
                <div className="col-md-4 mb-3">
                  <label htmlFor="subject" className="form-label">Subject *</label>
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
                
                <div className="col-md-12 mb-3">
                  <label htmlFor="description" className="form-label">Description</label>
                  <textarea
                    className="form-control"
                    id="description"
                    name="description"
                    rows="3"
                    value={formData.description}
                    onChange={handleChange}
                  ></textarea>
                </div>
                
                <div className="col-md-12 mb-3">
                  <FileUpload
                    onFileSelect={handleFileSelect}
                    acceptedFileTypes={['pdf', 'doc', 'docx', 'ppt', 'pptx', 'xls', 'xlsx']}
                    maxFileSize={10}
                    label="Attach Files (Optional)"
                  />
                  
                  {formData.attachments.length > 0 && (
                    <div className="mt-2">
                      <p>Attachments:</p>
                      <ul className="list-group">
                        {formData.attachments.map((file, index) => (
                          <li key={index} className="list-group-item d-flex justify-content-between align-items-center">
                            {file.name} ({(file.size / 1024 / 1024).toFixed(2)}MB)
                            <button
                              type="button"
                              className="btn btn-sm btn-danger"
                              onClick={() => removeAttachment(index)}
                            >
                              Remove
                            </button>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
              
              <button type="submit" className="btn btn-success" disabled={loading}>
                {loading ? 'Saving...' : 'Assign Homework'}
              </button>
            </form>
          </div>
        </div>
      )}

      {viewSubmissions && (
        <div className="card mb-4">
          <div className="card-header bg-primary text-white d-flex justify-content-between align-items-center">
            <h4 className="mb-0">Submissions for: {viewSubmissions.title}</h4>
            <button
              type="button"
              className="btn-close btn-close-white"
              onClick={() => setViewSubmissions(null)}
            ></button>
          </div>
          <div className="card-body">
            {viewSubmissions.submissions.length === 0 ? (
              <div className="alert alert-info">No submissions yet.</div>
            ) : (
              <div className="table-responsive">
                <table className="table table-hover">
                  <thead>
                    <tr>
                      <th>Student</th>
                      <th>Status</th>
                      <th>Submission Date</th>
                      <th>File</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {viewSubmissions.submissions.map(submission => (
                      <tr key={submission.id}>
                        <td>{submission.student}</td>
                        <td>
                          <span className={`badge ${submission.status === 'Submitted' ? 'bg-success' : 'bg-warning'}`}>
                            {submission.status}
                          </span>
                        </td>
                        <td>{submission.submissionDate || 'Not submitted'}</td>
                        <td>{submission.file || '-'}</td>
                        <td>
                          {submission.file && (
                            <button className="btn btn-sm btn-primary">
                              Download
                            </button>
                          )}
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

      {loading && !showForm && !viewSubmissions ? (
        <div className="text-center py-5">
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      ) : (
        <div className="card">
          <div className="card-header bg-primary text-white">
            <h4 className="mb-0">Assigned Homework</h4>
          </div>
          <div className="card-body">
            {homeworks.length === 0 ? (
              <div className="alert alert-info">
                No homework assigned yet.
              </div>
            ) : (
              <div className="table-responsive">
                <table className="table table-hover">
                  <thead>
                    <tr>
                      <th>Title</th>
                      <th>Class</th>
                      <th>Subject</th>
                      <th>Assigned Date</th>
                      <th>Due Date</th>
                      <th>Submissions</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {homeworks.map(homework => (
                      <tr key={homework.id}>
                        <td>{homework.title}</td>
                        <td>{homework.class} {homework.section}</td>
                        <td>{homework.subject}</td>
                        <td>{homework.assignedDate}</td>
                        <td>{homework.dueDate}</td>
                        <td>
                          {homework.submissions.filter(s => s.status === 'Submitted').length} / {homework.submissions.length}
                        </td>
                        <td>
                          <button
                            className="btn btn-sm btn-info me-2"
                            onClick={() => showSubmissions(homework)}
                          >
                            View Submissions
                          </button>
                          <button
                            className="btn btn-sm btn-danger"
                            onClick={() => deleteHomework(homework.id)}
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

export default ManageHomework;
