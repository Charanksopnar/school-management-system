import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const ParentDashboard = () => {
  const { user } = useAuth();

  // Mock data for children
  const children = [
    {
      id: 1,
      name: 'John Doe',
      class: '10A',
      rollNumber: '10A01',
      attendance: '92%',
      grade: 'A-'
    },
    {
      id: 2,
      name: 'Jane Doe',
      class: '8B',
      rollNumber: '8B05',
      attendance: '95%',
      grade: 'A'
    }
  ];

  return (
    <div>
      <h1 className="mb-4">Parent Dashboard</h1>
      <p className="lead mb-4">Welcome, {user?.name}!</p>

      <div className="row mb-4">
        <div className="col-md-12">
          <div className="card">
            <div className="card-header bg-primary text-white">
              <h4 className="mb-0">My Children</h4>
            </div>
            <div className="card-body">
              <div className="table-responsive">
                <table className="table table-hover">
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Class</th>
                      <th>Roll Number</th>
                      <th>Attendance</th>
                      <th>Grade</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {children.map(child => (
                      <tr key={child.id}>
                        <td>{child.name}</td>
                        <td>{child.class}</td>
                        <td>{child.rollNumber}</td>
                        <td>{child.attendance}</td>
                        <td>{child.grade}</td>
                        <td>
                          <Link to={`/parent/attendance/${child.id}`} className="btn btn-sm btn-primary me-2">
                            Attendance
                          </Link>
                          <Link to={`/parent/results/${child.id}`} className="btn btn-sm btn-success">
                            Results
                          </Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-md-6 mb-4">
          <div className="card">
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
        </div>

        <div className="col-md-6 mb-4">
          <div className="card">
            <div className="card-header bg-primary text-white">
              <h4 className="mb-0">Fee Payment Status</h4>
            </div>
            <div className="card-body">
              <div className="table-responsive">
                <table className="table">
                  <thead>
                    <tr>
                      <th>Child</th>
                      <th>Fee Type</th>
                      <th>Amount</th>
                      <th>Due Date</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>John Doe</td>
                      <td>Tuition Fee (Q2)</td>
                      <td>$500</td>
                      <td>May 15, 2023</td>
                      <td><span className="badge bg-warning">Pending</span></td>
                    </tr>
                    <tr>
                      <td>Jane Doe</td>
                      <td>Tuition Fee (Q2)</td>
                      <td>$500</td>
                      <td>May 15, 2023</td>
                      <td><span className="badge bg-warning">Pending</span></td>
                    </tr>
                    <tr>
                      <td>John Doe</td>
                      <td>Lab Fee</td>
                      <td>$100</td>
                      <td>April 10, 2023</td>
                      <td><span className="badge bg-success">Paid</span></td>
                    </tr>
                    <tr>
                      <td>Jane Doe</td>
                      <td>Lab Fee</td>
                      <td>$100</td>
                      <td>April 10, 2023</td>
                      <td><span className="badge bg-success">Paid</span></td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <button className="btn btn-primary mt-3">Pay Fees</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ParentDashboard;
