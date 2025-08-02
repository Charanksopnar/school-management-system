import React, { useState } from 'react';

const ManageAttendance = () => {
  const [selectedClass, setSelectedClass] = useState('');
  const [selectedSection, setSelectedSection] = useState('');
  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().split('T')[0]
  );
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(false);
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

  // Mock student data
  const mockStudents = [
    { id: 1, name: 'John Doe', rollNumber: '10A01' },
    { id: 2, name: 'Jane Smith', rollNumber: '10A02' },
    { id: 3, name: 'Michael Johnson', rollNumber: '10A03' },
    { id: 4, name: 'Emily Brown', rollNumber: '10A04' },
    { id: 5, name: 'David Wilson', rollNumber: '10A05' },
    { id: 6, name: 'Sarah Taylor', rollNumber: '10A06' },
    { id: 7, name: 'James Anderson', rollNumber: '10A07' },
    { id: 8, name: 'Olivia Martinez', rollNumber: '10A08' },
    { id: 9, name: 'Robert Garcia', rollNumber: '10A09' },
    { id: 10, name: 'Sophia Robinson', rollNumber: '10A10' }
  ];

  // Load students when class and section are selected
  const loadStudents = () => {
    if (!selectedClass || !selectedSection) {
      setMessage({ type: 'danger', text: 'Please select class and section' });
      return;
    }

    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      // Initialize students with default attendance status
      const studentsWithAttendance = mockStudents.map(student => ({
        ...student,
        status: 'Present' // Default status
      }));
      
      setStudents(studentsWithAttendance);
      setLoading(false);
      setMessage(null);
    }, 500);
  };

  // Handle attendance status change
  const handleStatusChange = (studentId, status) => {
    setStudents(
      students.map(student =>
        student.id === studentId ? { ...student, status } : student
      )
    );
  };

  // Submit attendance
  const submitAttendance = () => {
    if (students.length === 0) {
      setMessage({ type: 'danger', text: 'No students to mark attendance for' });
      return;
    }

    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      setMessage({ 
        type: 'success', 
        text: `Attendance for ${selectedClass} ${selectedSection} on ${selectedDate} has been saved successfully` 
      });
    }, 1000);
  };

  return (
    <div>
      <h1 className="mb-4">Manage Attendance</h1>

      {message && (
        <div className={`alert alert-${message.type}`} role="alert">
          {message.text}
        </div>
      )}

      <div className="card mb-4">
        <div className="card-body">
          <div className="row">
            <div className="col-md-3 mb-3">
              <label htmlFor="class" className="form-label">Class</label>
              <select
                className="form-select"
                id="class"
                value={selectedClass}
                onChange={(e) => setSelectedClass(e.target.value)}
              >
                <option value="">Select Class</option>
                {classes.map(cls => (
                  <option key={cls.id} value={cls.name}>
                    {cls.name}
                  </option>
                ))}
              </select>
            </div>
            
            <div className="col-md-3 mb-3">
              <label htmlFor="section" className="form-label">Section</label>
              <select
                className="form-select"
                id="section"
                value={selectedSection}
                onChange={(e) => setSelectedSection(e.target.value)}
              >
                <option value="">Select Section</option>
                {sections.map(section => (
                  <option key={section.id} value={section.name}>
                    {section.name}
                  </option>
                ))}
              </select>
            </div>
            
            <div className="col-md-3 mb-3">
              <label htmlFor="date" className="form-label">Date</label>
              <input
                type="date"
                className="form-control"
                id="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
              />
            </div>
            
            <div className="col-md-3 mb-3 d-flex align-items-end">
              <button
                className="btn btn-primary w-100"
                onClick={loadStudents}
                disabled={loading}
              >
                {loading ? 'Loading...' : 'Load Students'}
              </button>
            </div>
          </div>
        </div>
      </div>

      {students.length > 0 && (
        <div className="card">
          <div className="card-header bg-primary text-white">
            <h4 className="mb-0">
              Attendance for {selectedClass} {selectedSection} - {selectedDate}
            </h4>
          </div>
          <div className="card-body">
            <div className="table-responsive">
              <table className="table table-hover">
                <thead>
                  <tr>
                    <th>Roll No.</th>
                    <th>Name</th>
                    <th>Status</th>
                    <th>Remarks</th>
                  </tr>
                </thead>
                <tbody>
                  {students.map(student => (
                    <tr key={student.id}>
                      <td>{student.rollNumber}</td>
                      <td>{student.name}</td>
                      <td>
                        <select
                          className="form-select"
                          value={student.status}
                          onChange={(e) => handleStatusChange(student.id, e.target.value)}
                        >
                          <option value="Present">Present</option>
                          <option value="Absent">Absent</option>
                          <option value="Late">Late</option>
                          <option value="Excused">Excused</option>
                        </select>
                      </td>
                      <td>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Add remarks"
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            <button
              className="btn btn-success mt-3"
              onClick={submitAttendance}
              disabled={loading}
            >
              {loading ? 'Saving...' : 'Save Attendance'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageAttendance;
