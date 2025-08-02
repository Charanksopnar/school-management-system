import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const ViewChildren = () => {
  const [children, setChildren] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Mock data for children
  const mockChildren = [
    {
      id: 1,
      name: 'John Doe',
      class: 'Class 10',
      section: 'A',
      rollNumber: '10A01',
      attendance: '92%',
      grade: 'A-',
      teacherRemarks: 'Good student, needs to improve in Mathematics'
    },
    {
      id: 2,
      name: 'Jane Doe',
      class: 'Class 8',
      section: 'B',
      rollNumber: '8B05',
      attendance: '95%',
      grade: 'A',
      teacherRemarks: 'Excellent student, very attentive in class'
    }
  ];

  // Load children data
  useEffect(() => {
    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setChildren(mockChildren);
      setLoading(false);
    }, 500);
  }, []);

  return (
    <div>
      <h1 className="mb-4">My Children</h1>

      {loading ? (
        <div className="text-center py-5">
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      ) : (
        <>
          {children.length === 0 ? (
            <div className="alert alert-info">
              No children found.
            </div>
          ) : (
            <div className="row">
              {children.map(child => (
                <div className="col-md-6 mb-4" key={child.id}>
                  <div className="card h-100">
                    <div className="card-header bg-primary text-white">
                      <h4 className="mb-0">{child.name}</h4>
                    </div>
                    <div className="card-body">
                      <div className="row mb-3">
                        <div className="col-md-6">
                          <p><strong>Class:</strong> {child.class} {child.section}</p>
                          <p><strong>Roll Number:</strong> {child.rollNumber}</p>
                        </div>
                        <div className="col-md-6">
                          <p><strong>Attendance:</strong> {child.attendance}</p>
                          <p><strong>Grade:</strong> {child.grade}</p>
                        </div>
                      </div>
                      
                      <div className="mb-3">
                        <p><strong>Teacher's Remarks:</strong></p>
                        <p>{child.teacherRemarks}</p>
                      </div>
                      
                      <div className="d-flex justify-content-between">
                        <Link to={`/parent/attendance/${child.id}`} className="btn btn-primary">
                          View Attendance
                        </Link>
                        <Link to={`/parent/results/${child.id}`} className="btn btn-success">
                          View Results
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
          
          <div className="card mt-4">
            <div className="card-header bg-primary text-white">
              <h4 className="mb-0">Upcoming Events</h4>
            </div>
            <div className="card-body">
              <ul className="list-group">
                <li className="list-group-item">
                  <div className="d-flex w-100 justify-content-between">
                    <h5 className="mb-1">Parent-Teacher Meeting</h5>
                    <small>May 20, 2023</small>
                  </div>
                  <p className="mb-1">2:00 PM - 5:00 PM | School Auditorium</p>
                </li>
                <li className="list-group-item">
                  <div className="d-flex w-100 justify-content-between">
                    <h5 className="mb-1">Annual Day Celebration</h5>
                    <small>June 5, 2023</small>
                  </div>
                  <p className="mb-1">10:00 AM - 2:00 PM | School Grounds</p>
                </li>
                <li className="list-group-item">
                  <div className="d-flex w-100 justify-content-between">
                    <h5 className="mb-1">Summer Vacation Begins</h5>
                    <small>June 15, 2023</small>
                  </div>
                  <p className="mb-1">School closes for summer break</p>
                </li>
              </ul>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default ViewChildren;
