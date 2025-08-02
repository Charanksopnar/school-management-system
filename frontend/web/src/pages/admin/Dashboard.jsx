import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const AdminDashboard = () => {
  const { user } = useAuth();

  return (
    <div>
      <h1 className="mb-4">Admin Dashboard</h1>
      <p className="lead mb-4">Welcome, {user?.name}!</p>

      <div className="row">
        <div className="col-md-4 mb-4">
          <div className="card h-100">
            <div className="card-body">
              <h3 className="card-title">Manage Students</h3>
              <p className="card-text">
                Add, edit, or remove student records. View student details and academic progress.
              </p>
              <Link to="/admin/students" className="btn btn-primary">
                Manage Students
              </Link>
            </div>
          </div>
        </div>

        <div className="col-md-4 mb-4">
          <div className="card h-100">
            <div className="card-body">
              <h3 className="card-title">Manage Teachers</h3>
              <p className="card-text">
                Add, edit, or remove teacher records. Assign classes and subjects to teachers.
              </p>
              <Link to="/admin/teachers" className="btn btn-primary">
                Manage Teachers
              </Link>
            </div>
          </div>
        </div>

        <div className="col-md-4 mb-4">
          <div className="card h-100">
            <div className="card-body">
              <h3 className="card-title">Manage Classes</h3>
              <p className="card-text">
                Create and manage classes, sections, and subjects. Assign teachers to classes.
              </p>
              <Link to="/admin/classes" className="btn btn-primary">
                Manage Classes
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="row mt-4">
        <div className="col-md-6 mb-4">
          <div className="card">
            <div className="card-header bg-primary text-white">
              <h4 className="mb-0">Quick Stats</h4>
            </div>
            <div className="card-body">
              <div className="row">
                <div className="col-6 mb-3">
                  <h5>Total Students</h5>
                  <p className="h3">250</p>
                </div>
                <div className="col-6 mb-3">
                  <h5>Total Teachers</h5>
                  <p className="h3">25</p>
                </div>
                <div className="col-6">
                  <h5>Total Classes</h5>
                  <p className="h3">12</p>
                </div>
                <div className="col-6">
                  <h5>Total Parents</h5>
                  <p className="h3">180</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="col-md-6 mb-4">
          <div className="card">
            <div className="card-header bg-primary text-white">
              <h4 className="mb-0">Recent Activities</h4>
            </div>
            <div className="card-body">
              <ul className="list-group">
                <li className="list-group-item">New student registered - John Doe</li>
                <li className="list-group-item">New teacher added - Jane Smith</li>
                <li className="list-group-item">Class 10A schedule updated</li>
                <li className="list-group-item">Exam results published for Class 8</li>
                <li className="list-group-item">Fee structure updated for 2023-24</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
