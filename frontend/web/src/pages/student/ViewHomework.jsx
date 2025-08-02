import React, { useState, useEffect } from 'react';
import FileUpload from '../../components/common/FileUpload';

const ViewHomework = () => {
  const [homeworks, setHomeworks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('pending');
  const [selectedHomework, setSelectedHomework] = useState(null);
  const [submissionFile, setSubmissionFile] = useState(null);
  const [message, setMessage] = useState(null);

  // Mock homework data
  const mockHomeworks = [
    {
      id: 1,
      title: 'Algebra Practice Problems',
      description: 'Complete problems 1-20 from Chapter 5',
      class: 'Class 10',
      section: 'A',
      subject: 'Mathematics',
      teacher: 'Mr. Johnson',
      dueDate: '2023-06-15',
      assignedDate: '2023-06-08',
      attachments: [
        { name: 'algebra_problems.pdf', size: '1.2MB' }
      ],
      status: 'Pending',
      submission: null
    },
    {
      id: 2,
      title: 'Science Lab Report',
      description: 'Write a lab report on the photosynthesis experiment',
      class: 'Class 10',
      section: 'A',
      subject: 'Science',
      teacher: 'Ms. Smith',
      dueDate: '2023-06-20',
      assignedDate: '2023-06-10',
      attachments: [
        { name: 'lab_report_template.docx', size: '0.8MB' }
      ],
      status: 'Pending',
      submission: null
    },
    {
      id: 3,
      title: 'English Essay',
      description: 'Write a 500-word essay on the theme of friendship in the novel "To Kill a Mockingbird"',
      class: 'Class 10',
      section: 'A',
      subject: 'English',
      teacher: 'Mrs. Davis',
      dueDate: '2023-06-05',
      assignedDate: '2023-05-25',
      attachments: [],
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
      title: 'History Assignment',
      description: 'Research and write about a significant event from World War II',
      class: 'Class 10',
      section: 'A',
      subject: 'History',
      teacher: 'Mr. Wilson',
      dueDate: '2023-05-30',
      assignedDate: '2023-05-20',
      attachments: [],
      status: 'Submitted',
      submission: {
        file: 'history_assignment.pdf',
        submissionDate: '2023-05-29',
        feedback: 'Well researched. Include more primary sources next time.',
        grade: 'B+'
      }
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

  // Filter homeworks based on active tab
  const filteredHomeworks = homeworks.filter(homework => {
    if (activeTab === 'pending') {
      return homework.status === 'Pending';
    } else if (activeTab === 'submitted') {
      return homework.status === 'Submitted';
    }
    return true;
  });

  // Handle file selection
  const handleFileSelect = (file) => {
    setSubmissionFile(file);
  };

  // Submit homework
  const submitHomework = () => {
    if (!submissionFile) {
      setMessage({ type: 'danger', text: 'Please select a file to submit' });
      return;
    }
    
    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      const updatedHomeworks = homeworks.map(homework => {
        if (homework.id === selectedHomework.id) {
          return {
            ...homework,
            status: 'Submitted',
            submission: {
              file: submissionFile.name,
              submissionDate: new Date().toISOString().split('T')[0],
              feedback: null,
              grade: null
            }
          };
        }
        return homework;
      });
      
      setHomeworks(updatedHomeworks);
      setLoading(false);
      setSelectedHomework(null);
      setSubmissionFile(null);
      setMessage({ type: 'success', text: 'Homework submitted successfully' });
    }, 1000);
  };

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
      <h1 className="mb-4">My Homework</h1>

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

      <ul className="nav nav-tabs mb-4">
        <li className="nav-item">
          <button
            className={`nav-link ${activeTab === 'pending' ? 'active' : ''}`}
            onClick={() => setActiveTab('pending')}
          >
            Pending
          </button>
        </li>
        <li className="nav-item">
          <button
            className={`nav-link ${activeTab === 'submitted' ? 'active' : ''}`}
            onClick={() => setActiveTab('submitted')}
          >
            Submitted
          </button>
        </li>
        <li className="nav-item">
          <button
            className={`nav-link ${activeTab === 'all' ? 'active' : ''}`}
            onClick={() => setActiveTab('all')}
          >
            All
          </button>
        </li>
      </ul>

      {selectedHomework && (
        <div className="card mb-4">
          <div className="card-header bg-primary text-white d-flex justify-content-between align-items-center">
            <h4 className="mb-0">Submit Homework: {selectedHomework.title}</h4>
            <button
              type="button"
              className="btn-close btn-close-white"
              onClick={() => {
                setSelectedHomework(null);
                setSubmissionFile(null);
              }}
            ></button>
          </div>
          <div className="card-body">
            <div className="mb-3">
              <p><strong>Subject:</strong> {selectedHomework.subject}</p>
              <p><strong>Teacher:</strong> {selectedHomework.teacher}</p>
              <p><strong>Due Date:</strong> {selectedHomework.dueDate}</p>
              <p><strong>Description:</strong> {selectedHomework.description}</p>
            </div>
            
            <div className="mb-3">
              <FileUpload
                onFileSelect={handleFileSelect}
                acceptedFileTypes={['pdf', 'doc', 'docx', 'ppt', 'pptx', 'xls', 'xlsx', 'jpg', 'jpeg', 'png']}
                maxFileSize={10}
                label="Upload Homework Submission *"
              />
            </div>
            
            <button
              className="btn btn-success"
              onClick={submitHomework}
              disabled={loading || !submissionFile}
            >
              {loading ? 'Submitting...' : 'Submit Homework'}
            </button>
          </div>
        </div>
      )}

      {loading && !selectedHomework ? (
        <div className="text-center py-5">
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      ) : filteredHomeworks.length === 0 ? (
        <div className="alert alert-info">
          No homework found for the selected filter.
        </div>
      ) : (
        <div className="row">
          {filteredHomeworks.map(homework => (
            <div className="col-md-6 mb-4" key={homework.id}>
              <div className="card h-100">
                <div className="card-header d-flex justify-content-between align-items-center">
                  <h5 className="mb-0">{homework.title}</h5>
                  <span className={`badge ${homework.status === 'Submitted' ? 'bg-success' : 'bg-warning'}`}>
                    {homework.status}
                  </span>
                </div>
                <div className="card-body">
                  <p><strong>Subject:</strong> {homework.subject}</p>
                  <p><strong>Teacher:</strong> {homework.teacher}</p>
                  <p><strong>Assigned Date:</strong> {homework.assignedDate}</p>
                  <p><strong>Due Date:</strong> {homework.dueDate}</p>
                  
                  {homework.status === 'Pending' && (
                    <p className={getDaysStatus(homework.dueDate).class}>
                      <strong>Status:</strong> {getDaysStatus(homework.dueDate).text}
                    </p>
                  )}
                  
                  <p><strong>Description:</strong> {homework.description}</p>
                  
                  {homework.attachments.length > 0 && (
                    <div className="mb-3">
                      <p><strong>Attachments:</strong></p>
                      <ul className="list-group">
                        {homework.attachments.map((attachment, index) => (
                          <li key={index} className="list-group-item d-flex justify-content-between align-items-center">
                            {attachment.name}
                            <button className="btn btn-sm btn-primary">Download</button>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  
                  {homework.status === 'Submitted' && homework.submission && (
                    <div className="mb-3">
                      <p><strong>Submission:</strong></p>
                      <ul className="list-group">
                        <li className="list-group-item d-flex justify-content-between align-items-center">
                          {homework.submission.file}
                          <button className="btn btn-sm btn-primary">Download</button>
                        </li>
                      </ul>
                      <p className="mt-2"><strong>Submitted on:</strong> {homework.submission.submissionDate}</p>
                      
                      {homework.submission.feedback && (
                        <>
                          <p><strong>Feedback:</strong> {homework.submission.feedback}</p>
                          <p><strong>Grade:</strong> {homework.submission.grade}</p>
                        </>
                      )}
                    </div>
                  )}
                </div>
                <div className="card-footer">
                  {homework.status === 'Pending' && (
                    <button
                      className="btn btn-primary"
                      onClick={() => setSelectedHomework(homework)}
                    >
                      Submit Homework
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ViewHomework;
