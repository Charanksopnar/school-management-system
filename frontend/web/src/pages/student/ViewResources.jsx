import React, { useState, useEffect } from 'react';

const ViewResources = () => {
  const [resources, setResources] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('all');
  const [selectedSubject, setSelectedSubject] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [tutorialProgress, setTutorialProgress] = useState({});
  const [message, setMessage] = useState(null);

  // Mock resource data
  const mockResources = [
    {
      id: 1,
      title: 'Algebra Formulas',
      description: 'Complete list of algebra formulas for reference',
      type: 'note',
      class: 'Class 10',
      section: 'A',
      subject: 'Mathematics',
      teacher: 'Mr. Johnson',
      uploadDate: '2023-06-05',
      attachments: [
        { name: 'algebra_formulas.pdf', size: '1.5MB' }
      ]
    },
    {
      id: 2,
      title: 'Khan Academy - Quadratic Equations',
      description: 'Video tutorials on solving quadratic equations',
      type: 'tutorial',
      class: 'Class 10',
      section: 'A',
      subject: 'Mathematics',
      teacher: 'Mr. Johnson',
      uploadDate: '2023-06-08',
      link: 'https://www.khanacademy.org/math/algebra/x2f8bb11595b61c86:quadratic-functions-equations'
    },
    {
      id: 3,
      title: 'Science Lab Safety Guidelines',
      description: 'Important safety guidelines for science lab experiments',
      type: 'note',
      class: 'Class 10',
      section: 'A',
      subject: 'Science',
      teacher: 'Ms. Smith',
      uploadDate: '2023-06-10',
      attachments: [
        { name: 'lab_safety.pdf', size: '0.8MB' }
      ]
    },
    {
      id: 4,
      title: 'Crash Course - Photosynthesis',
      description: 'Video tutorial explaining the process of photosynthesis',
      type: 'tutorial',
      class: 'Class 10',
      section: 'A',
      subject: 'Science',
      teacher: 'Ms. Smith',
      uploadDate: '2023-06-12',
      link: 'https://www.youtube.com/watch?v=sQK3Yr4Sc_k'
    },
    {
      id: 5,
      title: 'English Grammar Rules',
      description: 'Comprehensive guide to English grammar rules',
      type: 'note',
      class: 'Class 10',
      section: 'A',
      subject: 'English',
      teacher: 'Mrs. Davis',
      uploadDate: '2023-06-15',
      attachments: [
        { name: 'grammar_rules.pdf', size: '2.1MB' }
      ]
    }
  ];

  // Mock tutorial progress data
  const mockTutorialProgress = {
    2: { completed: true, completionDate: '2023-06-10' },
    4: { completed: false, completionDate: null }
  };

  // Load resources and progress
  useEffect(() => {
    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setResources(mockResources);
      setTutorialProgress(mockTutorialProgress);
      setLoading(false);
    }, 500);
  }, []);

  // Get unique subjects from resources
  const subjects = ['all', ...new Set(resources.map(resource => resource.subject))];

  // Filter resources based on active tab, selected subject, and search term
  const filteredResources = resources.filter(resource => {
    const matchesTab = activeTab === 'all' || resource.type === activeTab;
    const matchesSubject = selectedSubject === 'all' || resource.subject === selectedSubject;
    const matchesSearch = searchTerm === '' || 
      resource.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      resource.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesTab && matchesSubject && matchesSearch;
  });

  // Mark tutorial as completed
  const markAsCompleted = (resourceId) => {
    setTutorialProgress({
      ...tutorialProgress,
      [resourceId]: { completed: true, completionDate: new Date().toISOString().split('T')[0] }
    });
    
    setMessage({ type: 'success', text: 'Tutorial marked as completed' });
  };

  return (
    <div>
      <h1 className="mb-4">Learning Resources</h1>

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
              <label htmlFor="resourceType" className="form-label">Resource Type</label>
              <select
                className="form-select"
                id="resourceType"
                value={activeTab}
                onChange={(e) => setActiveTab(e.target.value)}
              >
                <option value="all">All Resources</option>
                <option value="note">Notes/Documents</option>
                <option value="tutorial">Tutorials</option>
              </select>
            </div>
            
            <div className="col-md-4 mb-3">
              <label htmlFor="subject" className="form-label">Subject</label>
              <select
                className="form-select"
                id="subject"
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
              <label htmlFor="search" className="form-label">Search</label>
              <input
                type="text"
                className="form-control"
                id="search"
                placeholder="Search resources..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
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
      ) : filteredResources.length === 0 ? (
        <div className="alert alert-info">
          No resources found for the selected filters.
        </div>
      ) : (
        <div className="row">
          {filteredResources.map(resource => (
            <div className="col-md-6 mb-4" key={resource.id}>
              <div className="card h-100">
                <div className="card-header d-flex justify-content-between align-items-center">
                  <h5 className="mb-0">{resource.title}</h5>
                  <span className={`badge ${resource.type === 'note' ? 'bg-info' : 'bg-success'}`}>
                    {resource.type === 'note' ? 'Note/Document' : 'Tutorial'}
                  </span>
                </div>
                <div className="card-body">
                  <p><strong>Subject:</strong> {resource.subject}</p>
                  <p><strong>Teacher:</strong> {resource.teacher}</p>
                  <p><strong>Upload Date:</strong> {resource.uploadDate}</p>
                  <p><strong>Description:</strong> {resource.description}</p>
                  
                  {resource.type === 'note' && resource.attachments && resource.attachments.length > 0 && (
                    <div className="mb-3">
                      <p><strong>Attachments:</strong></p>
                      <ul className="list-group">
                        {resource.attachments.map((attachment, index) => (
                          <li key={index} className="list-group-item d-flex justify-content-between align-items-center">
                            {attachment.name} ({attachment.size})
                            <button className="btn btn-sm btn-primary">Download</button>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  
                  {resource.type === 'tutorial' && resource.link && (
                    <div className="mb-3">
                      <p><strong>Tutorial Link:</strong></p>
                      <div className="d-grid">
                        <a
                          href={resource.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="btn btn-primary mb-2"
                        >
                          Open Tutorial
                        </a>
                      </div>
                      
                      {tutorialProgress[resource.id] && tutorialProgress[resource.id].completed ? (
                        <div className="alert alert-success">
                          <p className="mb-0">
                            <strong>Completed on:</strong> {tutorialProgress[resource.id].completionDate}
                          </p>
                        </div>
                      ) : (
                        <div className="d-grid">
                          <button
                            className="btn btn-outline-success"
                            onClick={() => markAsCompleted(resource.id)}
                          >
                            Mark as Completed
                          </button>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="card mt-4">
        <div className="card-header bg-primary text-white">
          <h4 className="mb-0">Tutorial Completion Progress</h4>
        </div>
        <div className="card-body">
          {Object.keys(tutorialProgress).length === 0 ? (
            <div className="alert alert-info">
              No tutorial progress data available.
            </div>
          ) : (
            <div className="table-responsive">
              <table className="table">
                <thead>
                  <tr>
                    <th>Tutorial</th>
                    <th>Subject</th>
                    <th>Status</th>
                    <th>Completion Date</th>
                  </tr>
                </thead>
                <tbody>
                  {resources
                    .filter(resource => resource.type === 'tutorial')
                    .map(tutorial => (
                      <tr key={tutorial.id}>
                        <td>{tutorial.title}</td>
                        <td>{tutorial.subject}</td>
                        <td>
                          {tutorialProgress[tutorial.id] && tutorialProgress[tutorial.id].completed ? (
                            <span className="badge bg-success">Completed</span>
                          ) : (
                            <span className="badge bg-warning">Pending</span>
                          )}
                        </td>
                        <td>
                          {tutorialProgress[tutorial.id] && tutorialProgress[tutorial.id].completed
                            ? tutorialProgress[tutorial.id].completionDate
                            : '-'}
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ViewResources;
