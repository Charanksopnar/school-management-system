import React, { useState, useEffect } from 'react';
import FileUpload from '../../components/common/FileUpload';

const ManageResources = () => {
  const [resources, setResources] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    type: 'note',
    class: '',
    section: '',
    subject: '',
    link: '',
    attachments: []
  });
  const [message, setMessage] = useState(null);

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
      uploadDate: '2023-06-08',
      link: 'https://www.khanacademy.org/math/algebra/x2f8bb11595b61c86:quadratic-functions-equations'
    },
    {
      id: 3,
      title: 'Science Lab Safety Guidelines',
      description: 'Important safety guidelines for science lab experiments',
      type: 'note',
      class: 'Class 9',
      section: 'B',
      subject: 'Science',
      uploadDate: '2023-06-10',
      attachments: [
        { name: 'lab_safety.pdf', size: '0.8MB' }
      ]
    }
  ];

  // Load resources
  useEffect(() => {
    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setResources(mockResources);
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
      !formData.subject
    ) {
      setMessage({ type: 'danger', text: 'Please fill all required fields' });
      return;
    }
    
    if (formData.type === 'tutorial' && !formData.link) {
      setMessage({ type: 'danger', text: 'Please provide a link for the tutorial' });
      return;
    }
    
    if (formData.type === 'note' && formData.attachments.length === 0) {
      setMessage({ type: 'danger', text: 'Please attach at least one file for the note' });
      return;
    }
    
    // Create new resource
    const newResource = {
      id: resources.length + 1,
      ...formData,
      uploadDate: new Date().toISOString().split('T')[0]
    };
    
    // Simulate API call
    setLoading(true);
    setTimeout(() => {
      setResources([...resources, newResource]);
      setLoading(false);
      setShowForm(false);
      setFormData({
        title: '',
        description: '',
        type: 'note',
        class: '',
        section: '',
        subject: '',
        link: '',
        attachments: []
      });
      setMessage({ type: 'success', text: 'Resource added successfully' });
    }, 500);
  };

  // Delete resource
  const deleteResource = (id) => {
    if (window.confirm('Are you sure you want to delete this resource?')) {
      setLoading(true);
      
      // Simulate API call
      setTimeout(() => {
        setResources(resources.filter(resource => resource.id !== id));
        setLoading(false);
        setMessage({ type: 'success', text: 'Resource deleted successfully' });
      }, 500);
    }
  };

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1>Manage Resources</h1>
        <button
          className="btn btn-primary"
          onClick={() => setShowForm(!showForm)}
        >
          {showForm ? 'Cancel' : 'Add New Resource'}
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
            <h4 className="mb-0">Add New Resource</h4>
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
                  <label htmlFor="type" className="form-label">Resource Type *</label>
                  <select
                    className="form-select"
                    id="type"
                    name="type"
                    value={formData.type}
                    onChange={handleChange}
                    required
                  >
                    <option value="note">Note/Document</option>
                    <option value="tutorial">Tutorial Link</option>
                  </select>
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
                
                {formData.type === 'tutorial' && (
                  <div className="col-md-12 mb-3">
                    <label htmlFor="link" className="form-label">Tutorial Link *</label>
                    <input
                      type="url"
                      className="form-control"
                      id="link"
                      name="link"
                      value={formData.link}
                      onChange={handleChange}
                      required={formData.type === 'tutorial'}
                      placeholder="https://example.com/tutorial"
                    />
                  </div>
                )}
                
                {formData.type === 'note' && (
                  <div className="col-md-12 mb-3">
                    <FileUpload
                      onFileSelect={handleFileSelect}
                      acceptedFileTypes={['pdf', 'doc', 'docx', 'ppt', 'pptx', 'xls', 'xlsx']}
                      maxFileSize={10}
                      label="Attach Files *"
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
                )}
              </div>
              
              <button type="submit" className="btn btn-success" disabled={loading}>
                {loading ? 'Saving...' : 'Add Resource'}
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
            <h4 className="mb-0">Resources</h4>
          </div>
          <div className="card-body">
            {resources.length === 0 ? (
              <div className="alert alert-info">
                No resources added yet.
              </div>
            ) : (
              <div className="table-responsive">
                <table className="table table-hover">
                  <thead>
                    <tr>
                      <th>Title</th>
                      <th>Type</th>
                      <th>Class</th>
                      <th>Subject</th>
                      <th>Upload Date</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {resources.map(resource => (
                      <tr key={resource.id}>
                        <td>{resource.title}</td>
                        <td>
                          <span className={`badge ${resource.type === 'note' ? 'bg-info' : 'bg-success'}`}>
                            {resource.type === 'note' ? 'Note/Document' : 'Tutorial Link'}
                          </span>
                        </td>
                        <td>{resource.class} {resource.section}</td>
                        <td>{resource.subject}</td>
                        <td>{resource.uploadDate}</td>
                        <td>
                          {resource.type === 'tutorial' ? (
                            <a
                              href={resource.link}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="btn btn-sm btn-primary me-2"
                            >
                              Open Link
                            </a>
                          ) : (
                            <button
                              className="btn btn-sm btn-primary me-2"
                              onClick={() => alert('Download functionality would be implemented here')}
                            >
                              Download
                            </button>
                          )}
                          <button
                            className="btn btn-sm btn-danger"
                            onClick={() => deleteResource(resource.id)}
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

export default ManageResources;
