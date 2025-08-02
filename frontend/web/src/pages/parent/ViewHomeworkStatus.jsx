import React, { useState, useEffect } from 'react';

const ViewHomeworkStatus = () => {
  const [homeworks, setHomeworks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedChild, setSelectedChild] = useState('all');
  const [selectedSubject, setSelectedSubject] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [message, setMessage] = useState(null);

  // Mock children data
  const children = [
    { id: 1, name: 'John Doe', class: 'Class 10A' },
    { id: 2, name: 'Jane Doe', class: 'Class 8B' }
  ];

  // Mock homework data
  const mockHomeworks = [
    {
      id: 1,
      childId: 1,
      childName: 'John Doe',
      class: 'Class 10A',
      title: 'Algebra Practice Problems',
      description: 'Complete problems 1-20 from Chapter 5',
      subject: 'Mathematics',
      teacher: 'Mr. Johnson',
      dueDate: '2023-06-15',
      assignedDate: '2023-06-08',
      status: 'Pending',
      submission: null
    },
    {
      id: 2,
      childId: 1,
      childName: 'John Doe',
      class: 'Class 10A',
      title: 'Science Lab Report',
      description: 'Write a lab report on the photosynthesis experiment',
      subject: 'Science',
      teacher: 'Ms. Smith',
      dueDate: '2023-06-20',
      assignedDate: '2023-06-10',
      status: 'Pending',
      submission: null
    },
    {
      id: 3,
      childId: 1,
      childName: 'John Doe',
      class: 'Class 10A',
      title: 'English Essay',
      description: 'Write a 500-word essay on the theme of friendship in the novel "To Kill a Mockingbird"',
      subject: 'English',
      teacher: 'Mrs. Davis',
      dueDate: '2023-06-05',
      assignedDate: '2023-05-25',
      status: 'Submitted',
      submission: {
        file: 'english_essay.docx',
        submissionDate: '2023-06-04',
        feedback: 'Good work! Your analysis of the theme is insightful.',
        grade: 'A'
      }
    },
    {
      id: 4,
      childId: 2,
      childName: 'Jane Doe',
      class: 'Class 8B',
      title: 'History Assignment',
      description: 'Research and write about a significant event from World War II',
      subject: 'History',
      teacher: 'Mr. Wilson',
      dueDate: '2023-05-30',
      assignedDate: '2023-05-20',
      status: 'Submitted',
      submission: {
        file: 'history_assignment.pdf',
        submissionDate: '2023-05-29',
        feedback: 'Well researched. Include more primary sources next time.',
        grade: 'B+'
      }
    },
    {
      id: 5,
      childId: 2,
      childName: 'Jane Doe',
      class: 'Class 8B',
      title: 'Math Problems',
      description: 'Solve problems 1-15 from Chapter 3',
      subject: 'Mathematics',
      teacher: 'Mrs. Johnson',
      dueDate: '2023-06-18',
      assignedDate: '2023-06-10',
      status: 'Pending',
      submission: null
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

  // Get unique subjects from homeworks
  const subjects = ['all', ...new Set(homeworks.map(homework => homework.subject))];

  // Filter homeworks based on selected child, subject, and status
  const filteredHomeworks = homeworks.filter(homework => {
    const matchesChild = selectedChild === 'all' || homework.childId === parseInt(selectedChild);
    const matchesSubject = selectedSubject === 'all' || homework.subject === selectedSubject;
    const matchesStatus = selectedStatus === 'all' || homework.status === selectedStatus;
    
    return matchesChild && matchesSubject && matchesStatus;
  });

  // Calculate homework statistics
  const calculateStats = () => {
    const childHomeworks = homeworks.filter(homework => 
      selectedChild === 'all' || homework.childId === parseInt(selectedChild)
    );
    
    const total = childHomeworks.length;
    const pending = childHomeworks.filter(hw => hw.status === 'Pending').length;
    const submitted = childHomeworks.filter(hw => hw.status === 'Submitted').length;
    const overdue = childHomeworks.filter(hw => {
      const today = new Date();
      const dueDate = new Date(hw.dueDate);
      return hw.status === 'Pending' && dueDate < today;
    }).length;
    
    const submittedPercentage = total > 0 ? ((submitted / total) * 100).toFixed(0) : 0;
    
    return {
      total,
      pending,
      submitted,
      overdue,
      submittedPercentage
    };
  };

  const stats = calculateStats();

  // Calculate days remaining or overdue
  const getDaysStatus = (dueDate) => {
    const today = new Date();
    const due = new Date(dueDate);
    const diffTime = due - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays < 0) {
      return { text: `${Math.abs(diffDays)} days overdue`, class: 'text-danger' };
    } else if (diffDays === 0) {
      return { text: 'Due today', class: 'text-warning' };
    } else {
      return { text: `${diffDays} days remaining`, class: 'text-success' };
    }
  };

  return (
    <div>
      <h1 className="mb-4">Homework Status</h1>

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

      <div className="card mb-4">
        <div className="card-body">
          <div className="row">
            <div className="col-md-4 mb-3">
              <label htmlFor="childSelect" className="form-label">Select Child</label>
              <select
                className="form-select"
                id="childSelect"
                value={selectedChild}
                onChange={(e) => setSelectedChild(e.target.value)}
              >
                <option value="all">All Children</option>
                {children.map(child => (
                  <option key={child.id} value={child.id}>
                    {child.name} ({child.class})
                  </option>
                ))}
              </select>
            </div>
            
            <div className="col-md-4 mb-3">
              <label htmlFor="subjectSelect" className="form-label">Subject</label>
              <select
                className="form-select"
                id="subjectSelect"
                value={selectedSubject}
                onChange={(e) => setSelectedSubject(e.target.value)}
              >
                {subjects.map((subject, index) => (
                  <option key={index} value={subject}>
                    {subject === 'all' ? 'All Subjects' : subject}
                  </option>
                ))}
              </select>
            </div>
            
            <div className="col-md-4 mb-3">
              <label htmlFor="statusSelect" className="form-label">Status</label>
              <select
                className="form-select"
                id="statusSelect"
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
              >
                <option value="all">All Status</option>
                <option value="Pending">Pending</option>
                <option value="Submitted">Submitted</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      <div className="row mb-4">
        <div className="col-md-12">
          <div className="card">
            <div className="card-header bg-primary text-white">
              <h4 className="mb-0">Homework Statistics</h4>
            </div>
            <div className="card-body">
              <div className="row text-center">
                <div className="col-md-3 mb-3">
                  <h5>Total Homework</h5>
                  <div className="h1">{stats.total}</div>
                </div>
                <div className="col-md-3 mb-3">
                  <h5>Pending</h5>
                  <div className="h1 text-warning">{stats.pending}</div>
                </div>
                <div className="col-md-3 mb-3">
                  <h5>Submitted</h5>
                  <div className="h1 text-success">{stats.submitted}</div>
                  <div className="progress">
                    <div
                      className="progress-bar bg-success"
                      role="progressbar"
                      style={{ width: `${stats.submittedPercentage}%` }}
                      aria-valuenow={stats.submittedPercentage}
                      aria-valuemin="0"
                      aria-valuemax="100"
                    >
                      {stats.submittedPercentage}%
                    </div>
                  </div>
                </div>
                <div className="col-md-3 mb-3">
                  <h5>Overdue</h5>
                  <div className="h1 text-danger">{stats.overdue}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {loading ? (
        <div className="text-center py-5">
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      ) : filteredHomeworks.length === 0 ? (
        <div className="alert alert-info">
          No homework found for the selected filters.
        </div>
      ) : (
        <div className="card">
          <div className="card-header bg-primary text-white">
            <h4 className="mb-0">Homework List</h4>
          </div>
          <div className="card-body">
            <div className="table-responsive">
              <table className="table table-hover">
                <thead>
                  <tr>
                    <th>Child</th>
                    <th>Subject</th>
                    <th>Title</th>
                    <th>Due Date</th>
                    <th>Status</th>
                    <th>Details</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredHomeworks.map(homework => (
                    <tr key={homework.id}>
                      <td>{homework.childName}</td>
                      <td>{homework.subject}</td>
                      <td>{homework.title}</td>
                      <td>{homework.dueDate}</td>
                      <td>
                        <span className={`badge ${homework.status === 'Submitted' ? 'bg-success' : 'bg-warning'}`}>
                          {homework.status}
                        </span>
                        {homework.status === 'Pending' && (
                          <span className={`ms-2 small ${getDaysStatus(homework.dueDate).class}`}>
                            ({getDaysStatus(homework.dueDate).text})
                          </span>
                        )}
                      </td>
                      <td>
                        <button
                          className="btn btn-sm btn-primary"
                          data-bs-toggle="collapse"
                          data-bs-target={`#details-${homework.id}`}
                          aria-expanded="false"
                          aria-controls={`details-${homework.id}`}
                        >
                          View Details
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Homework Details Sections */}
      {filteredHomeworks.map(homework => (
        <div className="collapse mt-3" id={`details-${homework.id}`} key={`details-${homework.id}`}>
          <div className="card">
            <div className="card-header bg-secondary text-white">
              <h5 className="mb-0">{homework.title} - Details</h5>
            </div>
            <div className="card-body">
              <div className="row">
                <div className="col-md-6">
                  <p><strong>Child:</strong> {homework.childName}</p>
                  <p><strong>Class:</strong> {homework.class}</p>
                  <p><strong>Subject:</strong> {homework.subject}</p>
                  <p><strong>Teacher:</strong> {homework.teacher}</p>
                </div>
                <div className="col-md-6">
                  <p><strong>Assigned Date:</strong> {homework.assignedDate}</p>
                  <p><strong>Due Date:</strong> {homework.dueDate}</p>
                  <p><strong>Status:</strong> {homework.status}</p>
                  {homework.status === 'Submitted' && (
                    <p><strong>Submission Date:</strong> {homework.submission.submissionDate}</p>
                  )}
                </div>
              </div>
              
              <div className="mt-3">
                <p><strong>Description:</strong></p>
                <p>{homework.description}</p>
              </div>
              
              {homework.status === 'Submitted' && homework.submission && (
                <div className="mt-3">
                  <p><strong>Submission:</strong> {homework.submission.file}</p>
                  {homework.submission.feedback && (
                    <>
                      <p><strong>Teacher's Feedback:</strong> {homework.submission.feedback}</p>
                      <p><strong>Grade:</strong> {homework.submission.grade}</p>
                    </>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ViewHomeworkStatus;
