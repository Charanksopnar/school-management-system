import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { useAuth } from './context/AuthContext';

// Layout Components
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';

// Page Components
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import NotFound from './pages/NotFound';

// Admin Pages
import AdminDashboard from './pages/admin/Dashboard';
import ManageStudents from './pages/admin/ManageStudents';
import ManageTeachers from './pages/admin/ManageTeachers';
import ManageClasses from './pages/admin/ManageClasses';
import ManageFees from './pages/admin/ManageFees';
import ManageSalaries from './pages/admin/ManageSalaries';
import ManageNotifications from './pages/admin/ManageNotifications';

// Teacher Pages
import TeacherDashboard from './pages/teacher/Dashboard';
import ManageAttendance from './pages/teacher/ManageAttendance';
import ManageExams from './pages/teacher/ManageExams';
import ManageResults from './pages/teacher/ManageResults';
import ManageHomework from './pages/teacher/ManageHomework';
import ManageResources from './pages/teacher/ManageResources';
import MarksUpload from './pages/teacher/MarksUpload';

// Student Pages
import StudentDashboard from './pages/student/Dashboard';
import ViewAttendance from './pages/student/ViewAttendance';
import ViewResults from './pages/student/ViewResults';
import ViewSchedule from './pages/student/ViewSchedule';
import ViewHomework from './pages/student/ViewHomework';
import ViewResources from './pages/student/ViewResources';

// Parent Pages
import ParentDashboard from './pages/parent/Dashboard';
import ViewChildren from './pages/parent/ViewChildren';
import ViewChildAttendance from './pages/parent/ViewChildAttendance';
import ViewChildResults from './pages/parent/ViewChildResults';
import ViewFeeStatus from './pages/parent/ViewFeeStatus';
import ViewHomeworkStatus from './pages/parent/ViewHomeworkStatus';
import ParentMeetings from './pages/parent/ParentMeetings';

// Protected Route Component
import ProtectedRoute from './components/routing/ProtectedRoute';

function App() {
  const { isAuthenticated, user } = useAuth();

  return (
    <>
      <Navbar />
      <main className="container py-4">
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Protected Routes */}
          <Route path="/dashboard" element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          } />

          {/* Admin Routes */}
          <Route path="/admin/dashboard" element={
            <ProtectedRoute allowedRoles={['admin']}>
              <AdminDashboard />
            </ProtectedRoute>
          } />
          <Route path="/admin/students" element={
            <ProtectedRoute allowedRoles={['admin']}>
              <ManageStudents />
            </ProtectedRoute>
          } />
          <Route path="/admin/teachers" element={
            <ProtectedRoute allowedRoles={['admin']}>
              <ManageTeachers />
            </ProtectedRoute>
          } />
          <Route path="/admin/classes" element={
            <ProtectedRoute allowedRoles={['admin']}>
              <ManageClasses />
            </ProtectedRoute>
          } />
          <Route path="/admin/fees" element={
            <ProtectedRoute allowedRoles={['admin']}>
              <ManageFees />
            </ProtectedRoute>
          } />
          <Route path="/admin/salaries" element={
            <ProtectedRoute allowedRoles={['admin']}>
              <ManageSalaries />
            </ProtectedRoute>
          } />
          <Route path="/admin/notifications" element={
            <ProtectedRoute allowedRoles={['admin']}>
              <ManageNotifications />
            </ProtectedRoute>
          } />

          {/* Teacher Routes */}
          <Route path="/teacher/dashboard" element={
            <ProtectedRoute allowedRoles={['teacher']}>
              <TeacherDashboard />
            </ProtectedRoute>
          } />
          <Route path="/teacher/attendance" element={
            <ProtectedRoute allowedRoles={['teacher']}>
              <ManageAttendance />
            </ProtectedRoute>
          } />
          <Route path="/teacher/exams" element={
            <ProtectedRoute allowedRoles={['teacher']}>
              <ManageExams />
            </ProtectedRoute>
          } />
          <Route path="/teacher/results" element={
            <ProtectedRoute allowedRoles={['teacher']}>
              <ManageResults />
            </ProtectedRoute>
          } />
          <Route path="/teacher/homework" element={
            <ProtectedRoute allowedRoles={['teacher']}>
              <ManageHomework />
            </ProtectedRoute>
          } />
          <Route path="/teacher/resources" element={
            <ProtectedRoute allowedRoles={['teacher']}>
              <ManageResources />
            </ProtectedRoute>
          } />
          <Route path="/teacher/marks-upload" element={
            <ProtectedRoute allowedRoles={['teacher']}>
              <MarksUpload />
            </ProtectedRoute>
          } />

          {/* Student Routes */}
          <Route path="/student/dashboard" element={
            <ProtectedRoute allowedRoles={['student']}>
              <StudentDashboard />
            </ProtectedRoute>
          } />
          <Route path="/student/attendance" element={
            <ProtectedRoute allowedRoles={['student']}>
              <ViewAttendance />
            </ProtectedRoute>
          } />
          <Route path="/student/results" element={
            <ProtectedRoute allowedRoles={['student']}>
              <ViewResults />
            </ProtectedRoute>
          } />
          <Route path="/student/schedule" element={
            <ProtectedRoute allowedRoles={['student']}>
              <ViewSchedule />
            </ProtectedRoute>
          } />
          <Route path="/student/homework" element={
            <ProtectedRoute allowedRoles={['student']}>
              <ViewHomework />
            </ProtectedRoute>
          } />
          <Route path="/student/resources" element={
            <ProtectedRoute allowedRoles={['student']}>
              <ViewResources />
            </ProtectedRoute>
          } />

          {/* Parent Routes */}
          <Route path="/parent/dashboard" element={
            <ProtectedRoute allowedRoles={['parent']}>
              <ParentDashboard />
            </ProtectedRoute>
          } />
          <Route path="/parent/children" element={
            <ProtectedRoute allowedRoles={['parent']}>
              <ViewChildren />
            </ProtectedRoute>
          } />
          <Route path="/parent/attendance/:childId" element={
            <ProtectedRoute allowedRoles={['parent']}>
              <ViewChildAttendance />
            </ProtectedRoute>
          } />
          <Route path="/parent/results/:childId" element={
            <ProtectedRoute allowedRoles={['parent']}>
              <ViewChildResults />
            </ProtectedRoute>
          } />
          <Route path="/parent/fees" element={
            <ProtectedRoute allowedRoles={['parent']}>
              <ViewFeeStatus />
            </ProtectedRoute>
          } />
          <Route path="/parent/homework" element={
            <ProtectedRoute allowedRoles={['parent']}>
              <ViewHomeworkStatus />
            </ProtectedRoute>
          } />
          <Route path="/parent/meetings" element={
            <ProtectedRoute allowedRoles={['parent']}>
              <ParentMeetings />
            </ProtectedRoute>
          } />

          {/* 404 Route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </>
  );
}

export default App;
