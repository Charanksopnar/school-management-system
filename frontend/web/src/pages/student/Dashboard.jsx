import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const StudentDashboard = () => {
  const { user } = useAuth();

  return (
    <div>
      <h1 className="mb-4">Student Dashboard</h1>
      <p className="lead mb-4">Welcome, {user?.name}!</p>

      <div className="row">
        <div className="col-md-4 mb-4">
          <div className="card h-100">
            <div className="card-body">
              <h3 className="card-title">Attendance</h3>
              <p className="card-text">
                View your attendance records and statistics.
              </p>
              <Link to="/student/attendance" className="btn btn-primary">
                View Attendance
              </Link>
            </div>
          </div>
        </div>

        <div className="col-md-4 mb-4">
          <div className="card h-100">
            <div className="card-body">
              <h3 className="card-title">Results</h3>
              <p className="card-text">
                View your exam results and academic performance.
              </p>
              <Link to="/student/results" className="btn btn-primary">
                View Results
              </Link>
            </div>
          </div>
        </div>

        <div className="col-md-4 mb-4">
          <div className="card h-100">
            <div className="card-body">
              <h3 className="card-title">Schedule</h3>
              <p className="card-text">
                View your class schedule and upcoming exams.
              </p>
              <Link to="/student/schedule" className="btn btn-primary">
                View Schedule
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="row mt-4">
        <div className="col-md-6 mb-4">
          <div className="card">
            <div className="card-header bg-primary text-white">
              <h4 className="mb-0">Today's Schedule</h4>
            </div>
            <div className="card-body">
              <ul className="list-group">
                <li className="list-group-item">
                  <div className="d-flex w-100 justify-content-between">
                    <h5 className="mb-1">Mathematics</h5>
                    <small>8:00 AM - 9:00 AM</small>
                  </div>
                  <p className="mb-1">Room 101 | Mr. Johnson</p>
                </li>
                <li className="list-group-item">
                  <div className="d-flex w-100 justify-content-between">
                    <h5 className="mb-1">Science</h5>
                    <small>10:00 AM - 11:00 AM</small>
                  </div>
                  <p className="mb-1">Room 102 | Ms. Smith</p>
                </li>
                <li className="list-group-item">
                  <div className="d-flex w-100 justify-content-between">
                    <h5 className="mb-1">English</h5>
                    <small>1:00 PM - 2:00 PM</small>
                  </div>
                  <p className="mb-1">Room 103 | Mrs. Davis</p>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="col-md-6 mb-4">
          <div className="card">
            <div className="card-header bg-primary text-white">
              <h4 className="mb-0">Upcoming Exams</h4>
            </div>
            <div className="card-body">
              <ul className="list-group">
                <li className="list-group-item">
                  <div className="d-flex w-100 justify-content-between">
                    <h5 className="mb-1">Mathematics Mid-Term</h5>
                    <small>May 15, 2023</small>
                  </div>
                  <p className="mb-1">9:00 AM - 11:00 AM | Room 201</p>
                </li>
                <li className="list-group-item">
                  <div className="d-flex w-100 justify-content-between">
                    <h5 className="mb-1">Science Quiz</h5>
                    <small>May 18, 2023</small>
                  </div>
                  <p className="mb-1">10:00 AM - 11:00 AM | Room 202</p>
                </li>
                <li className="list-group-item">
                  <div className="d-flex w-100 justify-content-between">
                    <h5 className="mb-1">English Essay</h5>
                    <small>May 20, 2023</small>
                  </div>
                  <p className="mb-1">1:00 PM - 3:00 PM | Room 203</p>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div className="row mt-2">
        <div className="col-md-12">
          <div className="card">
            <div className="card-header bg-primary text-white">
              <h4 className="mb-0">Academic Progress</h4>
            </div>
            <div className="card-body">
              <div className="row">
                <div className="col-md-4 text-center mb-3">
                  <h5>Attendance</h5>
                  <div className="h1">92%</div>
                  <p className="text-muted">Present: 46/50 days</p>
                </div>
                <div className="col-md-4 text-center mb-3">
                  <h5>Average Grade</h5>
                  <div className="h1">A-</div>
                  <p className="text-muted">GPA: 3.7/4.0</p>
                </div>
                <div className="col-md-4 text-center mb-3">
                  <h5>Class Rank</h5>
                  <div className="h1">5</div>
                  <p className="text-muted">Out of 30 students</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;
