import React, { useState, useEffect } from 'react';

const ParentMeetings = () => {
  const [meetings, setMeetings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('upcoming');
  const [selectedChild, setSelectedChild] = useState('all');
  const [showBookingForm, setShowBookingForm] = useState(false);
  const [formData, setFormData] = useState({
    childId: '',
    teacherId: '',
    date: '',
    timeSlot: '',
    purpose: ''
  });
  const [message, setMessage] = useState(null);

  // Mock children data
  const children = [
    { id: 1, name: 'John Doe', class: 'Class 10A' },
    { id: 2, name: 'Jane Doe', class: 'Class 8B' }
  ];

  // Mock teachers data
  const teachers = [
    { id: 1, name: 'Mr. Johnson', subject: 'Mathematics', class: 'Class 10A' },
    { id: 2, name: 'Ms. Smith', subject: 'Science', class: 'Class 10A' },
    { id: 3, name: 'Mrs. Davis', subject: 'English', class: 'Class 10A' },
    { id: 4, name: 'Mr. Wilson', subject: 'History', class: 'Class 8B' },
    { id: 5, name: 'Mrs. Johnson', subject: 'Mathematics', class: 'Class 8B' }
  ];

  // Mock time slots
  const timeSlots = [
    '09:00 AM - 09:30 AM',
    '09:30 AM - 10:00 AM',
    '10:00 AM - 10:30 AM',
    '10:30 AM - 11:00 AM',
    '11:00 AM - 11:30 AM',
    '11:30 AM - 12:00 PM',
    '01:00 PM - 01:30 PM',
    '01:30 PM - 02:00 PM',
    '02:00 PM - 02:30 PM',
    '02:30 PM - 03:00 PM',
    '03:00 PM - 03:30 PM',
    '03:30 PM - 04:00 PM'
  ];

  // Mock meetings data
  const mockMeetings = [
    {
      id: 1,
      childId: 1,
      childName: 'John Doe',
      class: 'Class 10A',
      teacherId: 1,
      teacherName: 'Mr. Johnson',
      subject: 'Mathematics',
      date: '2023-06-25',
      timeSlot: '10:00 AM - 10:30 AM',
      purpose: 'Discuss math performance and areas for improvement',
      status: 'Scheduled',
      notes: null
    },
    {
      id: 2,
      childId: 2,
      childName: 'Jane Doe',
      class: 'Class 8B',
      teacherId: 5,
      teacherName: 'Mrs. Johnson',
      subject: 'Mathematics',
      date: '2023-06-28',
      timeSlot: '02:00 PM - 02:30 PM',
      purpose: 'Discuss recent test performance',
      status: 'Scheduled',
      notes: null
    },
    {
      id: 3,
      childId: 1,
      childName: 'John Doe',
      class: 'Class 10A',
      teacherId: 2,
      teacherName: 'Ms. Smith',
      subject: 'Science',
      date: '2023-05-15',
      timeSlot: '11:00 AM - 11:30 AM',
      purpose: 'Discuss science project progress',
      status: 'Completed',
      notes: 'John is doing well in science. Needs to focus more on practical experiments.'
    }
  ];

  // Load meetings
  useEffect(() => {
    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setMeetings(mockMeetings);
      setLoading(false);
    }, 500);
  }, []);

  // Filter meetings based on active tab and selected child
  const filteredMeetings = meetings.filter(meeting => {
    const today = new Date();
    const meetingDate = new Date(meeting.date);
    
    const isUpcoming = meetingDate >= today && meeting.status === 'Scheduled';
    const isPast = meetingDate < today || meeting.status === 'Completed';
    
    const matchesTab = 
      (activeTab === 'upcoming' && isUpcoming) ||
      (activeTab === 'past' && isPast) ||
      (activeTab === 'all');
    
    const matchesChild = selectedChild === 'all' || meeting.childId === parseInt(selectedChild);
    
    return matchesTab && matchesChild;
  });

  // Handle form input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    
    if (name === 'childId' && value) {
      // Reset teacher selection when child changes
      setFormData({
        ...formData,
        [name]: value,
        teacherId: ''
      });
    } else {
      setFormData({
        ...formData,
        [name]: value
      });
    }
  };

  // Get available teachers for selected child
  const getAvailableTeachers = () => {
    if (!formData.childId) return [];
    
    const selectedChildClass = children.find(child => child.id === parseInt(formData.childId))?.class;
    return teachers.filter(teacher => teacher.class === selectedChildClass);
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validate form
    if (
      !formData.childId ||
      !formData.teacherId ||
      !formData.date ||
      !formData.timeSlot ||
      !formData.purpose
    ) {
      setMessage({ type: 'danger', text: 'Please fill all required fields' });
      return;
    }
    
    // Check if the selected time slot is available
    const isTimeSlotTaken = meetings.some(meeting => 
      meeting.date === formData.date && 
      meeting.timeSlot === formData.timeSlot && 
      meeting.teacherId === parseInt(formData.teacherId) &&
      meeting.status === 'Scheduled'
    );
    
    if (isTimeSlotTaken) {
      setMessage({ type: 'danger', text: 'This time slot is already booked. Please select another time.' });
      return;
    }
    
    // Get child and teacher details
    const selectedChild = children.find(child => child.id === parseInt(formData.childId));
    const selectedTeacher = teachers.find(teacher => teacher.id === parseInt(formData.teacherId));
    
    // Create new meeting
    const newMeeting = {
      id: meetings.length + 1,
      childId: parseInt(formData.childId),
      childName: selectedChild.name,
      class: selectedChild.class,
      teacherId: parseInt(formData.teacherId),
      teacherName: selectedTeacher.name,
      subject: selectedTeacher.subject,
      date: formData.date,
      timeSlot: formData.timeSlot,
      purpose: formData.purpose,
      status: 'Scheduled',
      notes: null
    };
    
    // Simulate API call
    setLoading(true);
    setTimeout(() => {
      setMeetings([...meetings, newMeeting]);
      setLoading(false);
      setShowBookingForm(false);
      setFormData({
        childId: '',
        teacherId: '',
        date: '',
        timeSlot: '',
        purpose: ''
      });
      setMessage({ type: 'success', text: 'Meeting scheduled successfully' });
    }, 500);
  };

  // Cancel meeting
  const cancelMeeting = (id) => {
    if (window.confirm('Are you sure you want to cancel this meeting?')) {
      setLoading(true);
      
      // Simulate API call
      setTimeout(() => {
        const updatedMeetings = meetings.map(meeting => {
          if (meeting.id === id) {
            return { ...meeting, status: 'Cancelled' };
          }
          return meeting;
        });
        
        setMeetings(updatedMeetings);
        setLoading(false);
        setMessage({ type: 'success', text: 'Meeting cancelled successfully' });
      }, 500);
    }
  };

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1>Parent-Teacher Meetings</h1>
        <button
          className="btn btn-primary"
          onClick={() => setShowBookingForm(!showBookingForm)}
        >
          {showBookingForm ? 'Cancel' : 'Book New Meeting'}
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

      {showBookingForm && (
        <div className="card mb-4">
          <div className="card-header bg-primary text-white">
            <h4 className="mb-0">Book Parent-Teacher Meeting</h4>
          </div>
          <div className="card-body">
            <form onSubmit={handleSubmit}>
              <div className="row">
                <div className="col-md-6 mb-3">
                  <label htmlFor="childId" className="form-label">Select Child *</label>
                  <select
                    className="form-select"
                    id="childId"
                    name="childId"
                    value={formData.childId}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select Child</option>
                    {children.map(child => (
                      <option key={child.id} value={child.id}>
                        {child.name} ({child.class})
                      </option>
                    ))}
                  </select>
                </div>
                
                <div className="col-md-6 mb-3">
                  <label htmlFor="teacherId" className="form-label">Select Teacher *</label>
                  <select
                    className="form-select"
                    id="teacherId"
                    name="teacherId"
                    value={formData.teacherId}
                    onChange={handleChange}
                    required
                    disabled={!formData.childId}
                  >
                    <option value="">Select Teacher</option>
                    {getAvailableTeachers().map(teacher => (
                      <option key={teacher.id} value={teacher.id}>
                        {teacher.name} ({teacher.subject})
                      </option>
                    ))}
                  </select>
                </div>
                
                <div className="col-md-6 mb-3">
                  <label htmlFor="date" className="form-label">Meeting Date *</label>
                  <input
                    type="date"
                    className="form-control"
                    id="date"
                    name="date"
                    value={formData.date}
                    onChange={handleChange}
                    required
                    min={new Date().toISOString().split('T')[0]}
                  />
                </div>
                
                <div className="col-md-6 mb-3">
                  <label htmlFor="timeSlot" className="form-label">Time Slot *</label>
                  <select
                    className="form-select"
                    id="timeSlot"
                    name="timeSlot"
                    value={formData.timeSlot}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select Time Slot</option>
                    {timeSlots.map((slot, index) => (
                      <option key={index} value={slot}>
                        {slot}
                      </option>
                    ))}
                  </select>
                </div>
                
                <div className="col-md-12 mb-3">
                  <label htmlFor="purpose" className="form-label">Purpose of Meeting *</label>
                  <textarea
                    className="form-control"
                    id="purpose"
                    name="purpose"
                    rows="3"
                    value={formData.purpose}
                    onChange={handleChange}
                    required
                  ></textarea>
                </div>
              </div>
              
              <button type="submit" className="btn btn-success" disabled={loading}>
                {loading ? 'Booking...' : 'Book Meeting'}
              </button>
            </form>
          </div>
        </div>
      )}

      <div className="card mb-4">
        <div className="card-body">
          <div className="row">
            <div className="col-md-6 mb-3">
              <label htmlFor="childSelect" className="form-label">Filter by Child</label>
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
          </div>
        </div>
      </div>

      <ul className="nav nav-tabs mb-4">
        <li className="nav-item">
          <button
            className={`nav-link ${activeTab === 'upcoming' ? 'active' : ''}`}
            onClick={() => setActiveTab('upcoming')}
          >
            Upcoming Meetings
          </button>
        </li>
        <li className="nav-item">
          <button
            className={`nav-link ${activeTab === 'past' ? 'active' : ''}`}
            onClick={() => setActiveTab('past')}
          >
            Past Meetings
          </button>
        </li>
        <li className="nav-item">
          <button
            className={`nav-link ${activeTab === 'all' ? 'active' : ''}`}
            onClick={() => setActiveTab('all')}
          >
            All Meetings
          </button>
        </li>
      </ul>

      {loading && !showBookingForm ? (
        <div className="text-center py-5">
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      ) : filteredMeetings.length === 0 ? (
        <div className="alert alert-info">
          No meetings found for the selected filters.
        </div>
      ) : (
        <div className="card">
          <div className="card-header bg-primary text-white">
            <h4 className="mb-0">Meetings</h4>
          </div>
          <div className="card-body">
            <div className="table-responsive">
              <table className="table table-hover">
                <thead>
                  <tr>
                    <th>Child</th>
                    <th>Teacher</th>
                    <th>Subject</th>
                    <th>Date</th>
                    <th>Time</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredMeetings.map(meeting => (
                    <tr key={meeting.id}>
                      <td>{meeting.childName}</td>
                      <td>{meeting.teacherName}</td>
                      <td>{meeting.subject}</td>
                      <td>{meeting.date}</td>
                      <td>{meeting.timeSlot}</td>
                      <td>
                        <span className={`badge ${
                          meeting.status === 'Scheduled' ? 'bg-primary' :
                          meeting.status === 'Completed' ? 'bg-success' : 'bg-danger'
                        }`}>
                          {meeting.status}
                        </span>
                      </td>
                      <td>
                        <button
                          className="btn btn-sm btn-info me-2"
                          data-bs-toggle="collapse"
                          data-bs-target={`#details-${meeting.id}`}
                          aria-expanded="false"
                          aria-controls={`details-${meeting.id}`}
                        >
                          Details
                        </button>
                        
                        {meeting.status === 'Scheduled' && (
                          <button
                            className="btn btn-sm btn-danger"
                            onClick={() => cancelMeeting(meeting.id)}
                          >
                            Cancel
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Meeting Details Sections */}
      {filteredMeetings.map(meeting => (
        <div className="collapse mt-3" id={`details-${meeting.id}`} key={`details-${meeting.id}`}>
          <div className="card">
            <div className="card-header bg-secondary text-white">
              <h5 className="mb-0">Meeting Details</h5>
            </div>
            <div className="card-body">
              <div className="row">
                <div className="col-md-6">
                  <p><strong>Child:</strong> {meeting.childName}</p>
                  <p><strong>Class:</strong> {meeting.class}</p>
                  <p><strong>Teacher:</strong> {meeting.teacherName}</p>
                  <p><strong>Subject:</strong> {meeting.subject}</p>
                </div>
                <div className="col-md-6">
                  <p><strong>Date:</strong> {meeting.date}</p>
                  <p><strong>Time:</strong> {meeting.timeSlot}</p>
                  <p><strong>Status:</strong> {meeting.status}</p>
                </div>
              </div>
              
              <div className="mt-3">
                <p><strong>Purpose:</strong></p>
                <p>{meeting.purpose}</p>
              </div>
              
              {meeting.notes && (
                <div className="mt-3">
                  <p><strong>Meeting Notes:</strong></p>
                  <p>{meeting.notes}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ParentMeetings;
