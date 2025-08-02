import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';

const ViewChildAttendance = () => {
  const { childId } = useParams();
  const [child, setChild] = useState(null);
  const [attendanceData, setAttendanceData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  
  // Mock child data
  const mockChildren = [
    {
      id: 1,
      name: 'John Doe',
      class: 'Class 10',
      section: 'A',
      rollNumber: '10A01'
    },
    {
      id: 2,
      name: 'Jane Doe',
      class: 'Class 8',
      section: 'B',
      rollNumber: '8B05'
    }
  ];

  // Mock attendance data
  const mockAttendanceData = [
    { date: '2023-05-01', status: 'Present', remark: '' },
    { date: '2023-05-02', status: 'Present', remark: '' },
    { date: '2023-05-03', status: 'Present', remark: '' },
    { date: '2023-05-04', status: 'Absent', remark: 'Sick leave' },
    { date: '2023-05-05', status: 'Present', remark: '' },
    { date: '2023-05-08', status: 'Present', remark: '' },
    { date: '2023-05-09', status: 'Late', remark: 'Arrived 15 minutes late' },
    { date: '2023-05-10', status: 'Present', remark: '' },
    { date: '2023-05-11', status: 'Present', remark: '' },
    { date: '2023-05-12', status: 'Present', remark: '' },
    { date: '2023-05-15', status: 'Present', remark: '' },
    { date: '2023-05-16', status: 'Present', remark: '' },
    { date: '2023-05-17', status: 'Excused', remark: 'Family function' },
    { date: '2023-05-18', status: 'Present', remark: '' },
    { date: '2023-05-19', status: 'Present', remark: '' },
    { date: '2023-05-22', status: 'Present', remark: '' },
    { date: '2023-05-23', status: 'Present', remark: '' },
    { date: '2023-05-24', status: 'Present', remark: '' },
    { date: '2023-05-25', status: 'Present', remark: '' },
    { date: '2023-05-26', status: 'Absent', remark: 'Sick leave' }
  ];

  // Load child data
  useEffect(() => {
    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      const foundChild = mockChildren.find(c => c.id === parseInt(childId));
      setChild(foundChild || null);
      
      if (foundChild) {
        // Filter data for selected month and year
        const filteredData = mockAttendanceData.filter(item => {
          const date = new Date(item.date);
          return date.getMonth() === selectedMonth && date.getFullYear() === selectedYear;
        });
        
        setAttendanceData(filteredData);
      }
      
      setLoading(false);
    }, 500);
  }, [childId, selectedMonth, selectedYear]);

  // Calculate attendance statistics
  const calculateStats = (data) => {
    const total = data.length;
    const present = data.filter(item => item.status === 'Present').length;
    const absent = data.filter(item => item.status === 'Absent').length;
    const late = data.filter(item => item.status === 'Late').length;
    const excused = data.filter(item => item.status === 'Excused').length;
    
    const presentPercentage = total > 0 ? ((present / total) * 100).toFixed(2) : 0;
    
    return {
      total,
      present,
      absent,
      late,
      excused,
      presentPercentage
    };
  };

  // Get month name
  const getMonthName = (month) => {
    const months = [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
    ];
    return months[month];
  };

  // Get status badge class
  const getStatusBadgeClass = (status) => {
    switch (status) {
      case 'Present':
        return 'bg-success';
      case 'Absent':
        return 'bg-danger';
      case 'Late':
        return 'bg-warning';
      case 'Excused':
        return 'bg-info';
      default:
        return 'bg-secondary';
    }
  };

  const stats = calculateStats(attendanceData);

  if (loading) {
    return (
      <div className="text-center py-5">
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  if (!child) {
    return (
      <div className="alert alert-danger">
        Child not found. <Link to="/parent/children">Go back to children list</Link>
      </div>
    );
  }

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1>{child.name}'s Attendance</h1>
        <Link to="/parent/children" className="btn btn-primary">
          Back to Children
        </Link>
      </div>

      <div className="card mb-4">
        <div className="card-body">
          <div className="row">
            <div className="col-md-4 mb-3">
              <p><strong>Class:</strong> {child.class} {child.section}</p>
              <p><strong>Roll Number:</strong> {child.rollNumber}</p>
            </div>
            
            <div className="col-md-8 mb-3">
              <div className="row">
                <div className="col-md-6">
                  <label htmlFor="month" className="form-label">Month</label>
                  <select
                    className="form-select"
                    id="month"
                    value={selectedMonth}
                    onChange={(e) => setSelectedMonth(parseInt(e.target.value))}
                  >
                    {Array.from({ length: 12 }, (_, i) => (
                      <option key={i} value={i}>
                        {getMonthName(i)}
                      </option>
                    ))}
                  </select>
                </div>
                
                <div className="col-md-6">
                  <label htmlFor="year" className="form-label">Year</label>
                  <select
                    className="form-select"
                    id="year"
                    value={selectedYear}
                    onChange={(e) => setSelectedYear(parseInt(e.target.value))}
                  >
                    {Array.from({ length: 5 }, (_, i) => (
                      <option key={i} value={2023 - i}>
                        {2023 - i}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="row mb-4">
        <div className="col-md-12">
          <div className="card">
            <div className="card-header bg-primary text-white">
              <h4 className="mb-0">Attendance Statistics</h4>
            </div>
            <div className="card-body">
              <div className="row text-center">
                <div className="col-md-4 mb-3">
                  <h5>Present</h5>
                  <div className="h1 text-success">{stats.presentPercentage}%</div>
                  <p className="text-muted">{stats.present} out of {stats.total} days</p>
                </div>
                <div className="col-md-2 mb-3">
                  <h5>Absent</h5>
                  <div className="h1 text-danger">{stats.absent}</div>
                  <p className="text-muted">days</p>
                </div>
                <div className="col-md-2 mb-3">
                  <h5>Late</h5>
                  <div className="h1 text-warning">{stats.late}</div>
                  <p className="text-muted">days</p>
                </div>
                <div className="col-md-2 mb-3">
                  <h5>Excused</h5>
                  <div className="h1 text-info">{stats.excused}</div>
                  <p className="text-muted">days</p>
                </div>
                <div className="col-md-2 mb-3">
                  <h5>Total</h5>
                  <div className="h1">{stats.total}</div>
                  <p className="text-muted">days</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="card">
        <div className="card-header bg-primary text-white">
          <h4 className="mb-0">
            Attendance for {getMonthName(selectedMonth)} {selectedYear}
          </h4>
        </div>
        <div className="card-body">
          {attendanceData.length === 0 ? (
            <div className="alert alert-info">
              No attendance records found for this month.
            </div>
          ) : (
            <div className="table-responsive">
              <table className="table table-hover">
                <thead>
                  <tr>
                    <th>Date</th>
                    <th>Day</th>
                    <th>Status</th>
                    <th>Remarks</th>
                  </tr>
                </thead>
                <tbody>
                  {attendanceData.map((item, index) => {
                    const date = new Date(item.date);
                    const day = date.toLocaleDateString('en-US', { weekday: 'long' });
                    
                    return (
                      <tr key={index}>
                        <td>{date.toLocaleDateString()}</td>
                        <td>{day}</td>
                        <td>
                          <span className={`badge ${getStatusBadgeClass(item.status)}`}>
                            {item.status}
                          </span>
                        </td>
                        <td>{item.remark || '-'}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ViewChildAttendance;
