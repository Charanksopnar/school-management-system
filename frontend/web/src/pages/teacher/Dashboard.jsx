import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const TeacherDashboard = () => {
  const { user } = useAuth();

  return (
    <div>
      <h1 className="mb-4">Teacher Dashboard</h1>
      <p className="lead mb-4">Welcome, {user?.name}!</p>

      <div className="row">
        <div className="col-md-4 mb-4">
          <div className="card h-100">
            <div className="card-body">
              <h3 className="card-title">Manage Attendance</h3>
              <p className="card-text">
                Take and manage attendance for your classes. View attendance reports.
              </p>
              <Link to="/teacher/attendance" className="btn btn-primary">
                Manage Attendance
              </Link>
            </div>
          </div>
        </div>

        <div className="col-md-4 mb-4">
          <div className="card h-100">
            <div className="card-body">
              <h3 className="card-title">Manage Exams</h3>
              <p className="card-text">
                Create and schedule exams. Manage exam questions and papers.
              </p>
              <Link to="/teacher/exams" className="btn btn-primary">
                Manage Exams
              </Link>
            </div>
          </div>
        </div>

        <div className="col-md-4 mb-4">
          <div className="card h-100">
            <div className="card-body">
              <h3 className="card-title">Manage Results</h3>
              <p className="card-text">
                Enter and manage student results. Generate result reports.
              </p>
              <Link to="/teacher/results" className="btn btn-primary">
                Manage Results
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="row mt-4">
        <div className="col-md-6 mb-4">
          <div className="card">
            <div className="card-header bg-primary text-white">
              <h4 className="mb-0">My Classes</h4>
            </div>
            <div className="card-body">
              <ul className="list-group">
                <li className="list-group-item d-flex justify-content-between align-items-center">
                  Class 10A - Mathematics
                  <span className="badge bg-primary rounded-pill">30 students</span>
                </li>
                <li className="list-group-item d-flex justify-content-between align-items-center">
                  Class 9B - Mathematics
                  <span className="badge bg-primary rounded-pill">28 students</span>
                </li>
                <li className="list-group-item d-flex justify-content-between align-items-center">
                  Class 8A - Mathematics
                  <span className="badge bg-primary rounded-pill">32 students</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="col-md-6 mb-4">
          <div className="card">
            <div className="card-header bg-primary text-white">
              <h4 className="mb-0">Today's Schedule</h4>
            </div>
            <div className="card-body">
              <ul className="list-group">
                <li className="list-group-item">
                  <div className="d-flex w-100 justify-content-between">
                    <h5 className="mb-1">Class 10A - Mathematics</h5>
                    <small>8:00 AM - 9:00 AM</small>
                  </div>
                  <p className="mb-1">Room 101</p>
                </li>
                <li className="list-group-item">
                  <div className="d-flex w-100 justify-content-between">
                    <h5 className="mb-1">Class 9B - Mathematics</h5>
                    <small>10:00 AM - 11:00 AM</small>
                  </div>
                  <p className="mb-1">Room 102</p>
                </li>
                <li className="list-group-item">
                  <div className="d-flex w-100 justify-content-between">
                    <h5 className="mb-1">Class 8A - Mathematics</h5>
                    <small>1:00 PM - 2:00 PM</small>
                  </div>
                  <p className="mb-1">Room 103</p>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeacherDashboard;
