import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const Navbar = () => {
  const { isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  // Admin navigation links
  const adminLinks = (
    <ul className="navbar-nav me-auto">
      <li className="nav-item">
        <Link className="nav-link" to="/admin/dashboard">Dashboard</Link>
      </li>
      <li className="nav-item">
        <Link className="nav-link" to="/admin/students">Students</Link>
      </li>
      <li className="nav-item">
        <Link className="nav-link" to="/admin/teachers">Teachers</Link>
      </li>
      <li className="nav-item">
        <Link className="nav-link" to="/admin/classes">Classes</Link>
      </li>
      <li className="nav-item dropdown">
        <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown">
          Finance
        </a>
        <ul className="dropdown-menu">
          <li><Link className="dropdown-item" to="/admin/fees">Fee Management</Link></li>
          <li><Link className="dropdown-item" to="/admin/salaries">Salary Management</Link></li>
        </ul>
      </li>
      <li className="nav-item">
        <Link className="nav-link" to="/admin/notifications">Notifications</Link>
      </li>
    </ul>
  );

  // Teacher navigation links
  const teacherLinks = (
    <ul className="navbar-nav me-auto">
      <li className="nav-item">
        <Link className="nav-link" to="/teacher/dashboard">Dashboard</Link>
      </li>
      <li className="nav-item">
        <Link className="nav-link" to="/teacher/attendance">Attendance</Link>
      </li>
      <li className="nav-item dropdown">
        <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown">
          Academics
        </a>
        <ul className="dropdown-menu">
          <li><Link className="dropdown-item" to="/teacher/exams">Exams</Link></li>
          <li><Link className="dropdown-item" to="/teacher/results">Results</Link></li>
          <li><Link className="dropdown-item" to="/teacher/marks-upload">Marks Upload</Link></li>
        </ul>
      </li>
      <li className="nav-item dropdown">
        <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown">
          Resources
        </a>
        <ul className="dropdown-menu">
          <li><Link className="dropdown-item" to="/teacher/homework">Homework</Link></li>
          <li><Link className="dropdown-item" to="/teacher/resources">Study Materials</Link></li>
        </ul>
      </li>
    </ul>
  );

  // Student navigation links
  const studentLinks = (
    <ul className="navbar-nav me-auto">
      <li className="nav-item">
        <Link className="nav-link" to="/student/dashboard">Dashboard</Link>
      </li>
      <li className="nav-item">
        <Link className="nav-link" to="/student/attendance">Attendance</Link>
      </li>
      <li className="nav-item">
        <Link className="nav-link" to="/student/results">Results</Link>
      </li>
      <li className="nav-item">
        <Link className="nav-link" to="/student/schedule">Schedule</Link>
      </li>
      <li className="nav-item">
        <Link className="nav-link" to="/student/homework">Homework</Link>
      </li>
      <li className="nav-item">
        <Link className="nav-link" to="/student/resources">Learning Resources</Link>
      </li>
    </ul>
  );

  // Parent navigation links
  const parentLinks = (
    <ul className="navbar-nav me-auto">
      <li className="nav-item">
        <Link className="nav-link" to="/parent/dashboard">Dashboard</Link>
      </li>
      <li className="nav-item">
        <Link className="nav-link" to="/parent/children">My Children</Link>
      </li>
      <li className="nav-item">
        <Link className="nav-link" to="/parent/fees">Fee Status</Link>
      </li>
      <li className="nav-item">
        <Link className="nav-link" to="/parent/homework">Homework Status</Link>
      </li>
      <li className="nav-item">
        <Link className="nav-link" to="/parent/meetings">Parent-Teacher Meetings</Link>
      </li>
    </ul>
  );

  // User account links (shown for all authenticated users)
  const authLinks = (
    <ul className="navbar-nav ms-auto">
      <li className="nav-item">
        <span className="nav-link">Welcome, {user?.name}</span>
      </li>
      <li className="nav-item">
        <button onClick={handleLogout} className="nav-link btn btn-link">
          Logout
        </button>
      </li>
    </ul>
  );

  const guestLinks = (
    <ul className="navbar-nav ms-auto">
      <li className="nav-item">
        <Link className="nav-link" to="/login">Login</Link>
      </li>
      <li className="nav-item">
        <Link className="nav-link" to="/register">Register</Link>
      </li>
    </ul>
  );

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
      <div className="container">
        <Link className="navbar-brand" to="/">
          School Management System
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarMain"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarMain">
          {isAuthenticated && (
            <>
              {user?.role === 'admin' && adminLinks}
              {user?.role === 'teacher' && teacherLinks}
              {user?.role === 'student' && studentLinks}
              {user?.role === 'parent' && parentLinks}
              {authLinks}
            </>
          )}
          {!isAuthenticated && guestLinks}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
