import React, { useState, useEffect } from 'react';

const ManageNotifications = () => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    message: '',
    recipientType: 'all',
    recipients: [],
    priority: 'normal',
    sendDate: new Date().toISOString().split('T')[0]
  });
  const [message, setMessage] = useState(null);
  const [selectedRecipients, setSelectedRecipients] = useState([]);

  // Mock notification data
  const mockNotifications = [
    {
      id: 1,
      title: 'School Closed Due to Heavy Rain',
      message: 'Due to heavy rainfall, the school will remain closed tomorrow. Stay safe!',
      recipientType: 'all',
      recipients: ['All Users'],
      priority: 'high',
      sendDate: '2023-06-15',
      sentBy: 'Admin',
      status: 'Sent'
    },
    {
      id: 2,
      title: 'Parent-Teacher Meeting',
      message: 'Parent-Teacher meeting is scheduled on 20th June 2023 from 2:00 PM to 5:00 PM.',
      recipientType: 'parents',
      recipients: ['All Parents'],
      priority: 'normal',
      sendDate: '2023-06-10',
      sentBy: 'Admin',
      status: 'Sent'
    },
    {
      id: 3,
      title: 'Staff Meeting',
      message: 'Staff meeting is scheduled on 18th June 2023 at 3:00 PM in the conference room.',
      recipientType: 'teachers',
      recipients: ['All Teachers'],
      priority: 'normal',
      sendDate: '2023-06-12',
      sentBy: 'Admin',
      status: 'Sent'
    }
  ];

  // Mock users for recipient selection
  const mockUsers = {
    teachers: [
      { id: 1, name: 'John Smith', email: 'john.smith@example.com' },
      { id: 2, name: 'Sarah Johnson', email: 'sarah.johnson@example.com' },
      { id: 3, name: 'Robert Williams', email: 'robert.williams@example.com' }
    ],
    students: [
      { id: 1, name: 'John Doe', email: 'john.doe@example.com', class: 'Class 10A' },
      { id: 2, name: 'Jane Smith', email: 'jane.smith@example.com', class: 'Class 10A' },
      { id: 3, name: 'Michael Johnson', email: 'michael.johnson@example.com', class: 'Class 9B' }
    ],
    parents: [
      { id: 1, name: 'Robert Doe', email: 'robert.doe@example.com', children: ['John Doe'] },
      { id: 2, name: 'Emily Smith', email: 'emily.smith@example.com', children: ['Jane Smith'] },
      { id: 3, name: 'David Johnson', email: 'david.johnson@example.com', children: ['Michael Johnson'] }
    ],
    classes: [
      { id: 1, name: 'Class 10A' },
      { id: 2, name: 'Class 9B' },
      { id: 3, name: 'Class 8C' }
    ]
  };

  // Load notifications
  useEffect(() => {
    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setNotifications(mockNotifications);
      setLoading(false);
    }, 500);
  }, []);

  // Handle form input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    
    if (name === 'recipientType') {
      setSelectedRecipients([]);
      setFormData({
        ...formData,
        [name]: value,
        recipients: []
      });
    } else {
      setFormData({
        ...formData,
        [name]: value
      });
    }
  };

  // Handle recipient selection
  const handleRecipientSelection = (e) => {
    const { value, checked } = e.target;
    
    if (checked) {
      setSelectedRecipients([...selectedRecipients, value]);
      setFormData({
        ...formData,
        recipients: [...formData.recipients, value]
      });
    } else {
      setSelectedRecipients(selectedRecipients.filter(r => r !== value));
      setFormData({
        ...formData,
        recipients: formData.recipients.filter(r => r !== value)
      });
    }
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validate form
    if (
      !formData.title ||
      !formData.message ||
      !formData.sendDate
    ) {
      setMessage({ type: 'danger', text: 'Please fill all required fields' });
      return;
    }
    
    if (formData.recipientType !== 'all' && formData.recipients.length === 0) {
      setMessage({ type: 'danger', text: 'Please select at least one recipient' });
      return;
    }
    
    // Create new notification
    const newNotification = {
      id: notifications.length + 1,
      ...formData,
      sentBy: 'Admin',
      status: formData.sendDate === new Date().toISOString().split('T')[0] ? 'Sent' : 'Scheduled'
    };
    
    // Simulate API call
    setLoading(true);
    setTimeout(() => {
      setNotifications([newNotification, ...notifications]);
      setLoading(false);
      setShowForm(false);
      setFormData({
        title: '',
        message: '',
        recipientType: 'all',
        recipients: [],
        priority: 'normal',
        sendDate: new Date().toISOString().split('T')[0]
      });
      setSelectedRecipients([]);
      setMessage({ type: 'success', text: 'Notification created successfully' });
    }, 500);
  };

  // Delete notification
  const deleteNotification = (id) => {
    if (window.confirm('Are you sure you want to delete this notification?')) {
      setLoading(true);
      
      // Simulate API call
      setTimeout(() => {
        setNotifications(notifications.filter(notification => notification.id !== id));
        setLoading(false);
        setMessage({ type: 'success', text: 'Notification deleted successfully' });
      }, 500);
    }
  };

  // Render recipient selection based on recipient type
  const renderRecipientSelection = () => {
    if (formData.recipientType === 'all') {
      return (
        <div className="alert alert-info">
          Notification will be sent to all users (Teachers, Students, and Parents).
        </div>
      );
    }
    
    if (formData.recipientType === 'teachers') {
      return (
        <div className="mb-3">
          <label className="form-label">Select Teachers</label>
          <div className="d-flex mb-2">
            <div className="form-check me-3">
              <input
                type="checkbox"
                className="form-check-input"
                id="allTeachers"
                value="All Teachers"
                checked={selectedRecipients.includes('All Teachers')}
                onChange={handleRecipientSelection}
              />
              <label className="form-check-label" htmlFor="allTeachers">All Teachers</label>
            </div>
          </div>
          {!selectedRecipients.includes('All Teachers') && (
            <div className="row">
              {mockUsers.teachers.map(teacher => (
                <div className="col-md-4 mb-2" key={teacher.id}>
                  <div className="form-check">
                    <input
                      type="checkbox"
                      className="form-check-input"
                      id={`teacher-${teacher.id}`}
                      value={teacher.name}
                      checked={selectedRecipients.includes(teacher.name)}
                      onChange={handleRecipientSelection}
                    />
                    <label className="form-check-label" htmlFor={`teacher-${teacher.id}`}>
                      {teacher.name}
                    </label>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      );
    }
    
    if (formData.recipientType === 'students') {
      return (
        <div className="mb-3">
          <label className="form-label">Select Students</label>
          <div className="d-flex mb-2">
            <div className="form-check me-3">
              <input
                type="checkbox"
                className="form-check-input"
                id="allStudents"
                value="All Students"
                checked={selectedRecipients.includes('All Students')}
                onChange={handleRecipientSelection}
              />
              <label className="form-check-label" htmlFor="allStudents">All Students</label>
            </div>
            {mockUsers.classes.map(cls => (
              <div className="form-check me-3" key={cls.id}>
                <input
                  type="checkbox"
                  className="form-check-input"
                  id={`class-${cls.id}`}
                  value={cls.name}
                  checked={selectedRecipients.includes(cls.name)}
                  onChange={handleRecipientSelection}
                />
                <label className="form-check-label" htmlFor={`class-${cls.id}`}>
                  {cls.name}
                </label>
              </div>
            ))}
          </div>
          {!selectedRecipients.includes('All Students') && !mockUsers.classes.some(cls => selectedRecipients.includes(cls.name)) && (
            <div className="row">
              {mockUsers.students.map(student => (
                <div className="col-md-4 mb-2" key={student.id}>
                  <div className="form-check">
                    <input
                      type="checkbox"
                      className="form-check-input"
                      id={`student-${student.id}`}
                      value={student.name}
                      checked={selectedRecipients.includes(student.name)}
                      onChange={handleRecipientSelection}
                    />
                    <label className="form-check-label" htmlFor={`student-${student.id}`}>
                      {student.name} ({student.class})
                    </label>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      );
    }
    
    if (formData.recipientType === 'parents') {
      return (
        <div className="mb-3">
          <label className="form-label">Select Parents</label>
          <div className="d-flex mb-2">
            <div className="form-check me-3">
              <input
                type="checkbox"
                className="form-check-input"
                id="allParents"
                value="All Parents"
                checked={selectedRecipients.includes('All Parents')}
                onChange={handleRecipientSelection}
              />
              <label className="form-check-label" htmlFor="allParents">All Parents</label>
            </div>
          </div>
          {!selectedRecipients.includes('All Parents') && (
            <div className="row">
              {mockUsers.parents.map(parent => (
                <div className="col-md-4 mb-2" key={parent.id}>
                  <div className="form-check">
                    <input
                      type="checkbox"
                      className="form-check-input"
                      id={`parent-${parent.id}`}
                      value={parent.name}
                      checked={selectedRecipients.includes(parent.name)}
                      onChange={handleRecipientSelection}
                    />
                    <label className="form-check-label" htmlFor={`parent-${parent.id}`}>
                      {parent.name} (Parent of {parent.children.join(', ')})
                    </label>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      );
    }
    
    return null;
  };

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1>Manage Notifications</h1>
        <button
          className="btn btn-primary"
          onClick={() => setShowForm(!showForm)}
        >
          {showForm ? 'Cancel' : 'Create New Notification'}
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
            <h4 className="mb-0">Create New Notification</h4>
          </div>
          <div className="card-body">
            <form onSubmit={handleSubmit}>
              <div className="row">
                <div className="col-md-12 mb-3">
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
                
                <div className="col-md-12 mb-3">
                  <label htmlFor="message" className="form-label">Message *</label>
                  <textarea
                    className="form-control"
                    id="message"
                    name="message"
                    rows="4"
                    value={formData.message}
                    onChange={handleChange}
                    required
                  ></textarea>
                </div>
                
                <div className="col-md-4 mb-3">
                  <label htmlFor="recipientType" className="form-label">Recipient Type *</label>
                  <select
                    className="form-select"
                    id="recipientType"
                    name="recipientType"
                    value={formData.recipientType}
                    onChange={handleChange}
                    required
                  >
                    <option value="all">All Users</option>
                    <option value="teachers">Teachers</option>
                    <option value="students">Students</option>
                    <option value="parents">Parents</option>
                  </select>
                </div>
                
                <div className="col-md-4 mb-3">
                  <label htmlFor="priority" className="form-label">Priority</label>
                  <select
                    className="form-select"
                    id="priority"
                    name="priority"
                    value={formData.priority}
                    onChange={handleChange}
                  >
                    <option value="low">Low</option>
                    <option value="normal">Normal</option>
                    <option value="high">High</option>
                  </select>
                </div>
                
                <div className="col-md-4 mb-3">
                  <label htmlFor="sendDate" className="form-label">Send Date *</label>
                  <input
                    type="date"
                    className="form-control"
                    id="sendDate"
                    name="sendDate"
                    value={formData.sendDate}
                    onChange={handleChange}
                    required
                    min={new Date().toISOString().split('T')[0]}
                  />
                </div>
                
                <div className="col-md-12 mb-3">
                  {renderRecipientSelection()}
                </div>
              </div>
              
              <button type="submit" className="btn btn-success" disabled={loading}>
                {loading ? 'Saving...' : 'Send Notification'}
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
            <h4 className="mb-0">Notifications</h4>
          </div>
          <div className="card-body">
            {notifications.length === 0 ? (
              <div className="alert alert-info">
                No notifications found.
              </div>
            ) : (
              <div className="table-responsive">
                <table className="table table-hover">
                  <thead>
                    <tr>
                      <th>Title</th>
                      <th>Recipients</th>
                      <th>Priority</th>
                      <th>Send Date</th>
                      <th>Status</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {notifications.map(notification => (
                      <tr key={notification.id}>
                        <td>{notification.title}</td>
                        <td>{notification.recipients.join(', ')}</td>
                        <td>
                          <span className={`badge ${
                            notification.priority === 'high' ? 'bg-danger' :
                            notification.priority === 'normal' ? 'bg-primary' : 'bg-secondary'
                          }`}>
                            {notification.priority.charAt(0).toUpperCase() + notification.priority.slice(1)}
                          </span>
                        </td>
                        <td>{notification.sendDate}</td>
                        <td>
                          <span className={`badge ${notification.status === 'Sent' ? 'bg-success' : 'bg-warning'}`}>
                            {notification.status}
                          </span>
                        </td>
                        <td>
                          <button
                            className="btn btn-sm btn-danger"
                            onClick={() => deleteNotification(notification.id)}
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

export default ManageNotifications;
