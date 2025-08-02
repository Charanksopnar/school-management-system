import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Home = () => {
  const { isAuthenticated } = useAuth();

  return (
    <div className="text-center py-5">
      <h1 className="display-4 mb-4">Welcome to School Management System</h1>
      <p className="lead mb-4">
        A comprehensive solution for managing school operations, students, teachers, and more.
      </p>
      
      <div className="row mt-5">
        <div className="col-md-4 mb-4">
          <div className="card h-100">
            <div className="card-body">
              <h3 className="card-title">For Students</h3>
              <p className="card-text">
                Access your attendance, exam schedule, results, and more in one place.
              </p>
            </div>
          </div>
        </div>
        
        <div className="col-md-4 mb-4">
          <div className="card h-100">
            <div className="card-body">
              <h3 className="card-title">For Teachers</h3>
              <p className="card-text">
                Manage your classes, take attendance, create exams, and grade students easily.
              </p>
            </div>
          </div>
        </div>
        
        <div className="col-md-4 mb-4">
          <div className="card h-100">
            <div className="card-body">
              <h3 className="card-title">For Parents</h3>
              <p className="card-text">
                Stay updated with your child's progress, attendance, and academic performance.
              </p>
            </div>
          </div>
        </div>
      </div>
      
      {!isAuthenticated && (
        <div className="mt-5">
          <Link to="/login" className="btn btn-primary me-3">
            Login
          </Link>
          <Link to="/register" className="btn btn-secondary">
            Register
          </Link>
        </div>
      )}
    </div>
  );
};

export default Home;
