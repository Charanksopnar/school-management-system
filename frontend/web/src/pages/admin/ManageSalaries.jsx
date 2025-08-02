import React, { useState, useEffect } from 'react';

const ManageSalaries = () => {
  const [teachers, setTeachers] = useState([]);
  const [salaryHistory, setSalaryHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('current');
  const [showForm, setShowForm] = useState(false);
  const [selectedTeacher, setSelectedTeacher] = useState(null);
  const [formData, setFormData] = useState({
    teacherId: '',
    basicSalary: '',
    allowances: '',
    deductions: '',
    effectiveDate: ''
  });
  const [message, setMessage] = useState(null);

  // Mock teacher data
  const mockTeachers = [
    {
      id: 1,
      name: 'John Smith',
      employeeId: 'T001',
      department: 'Mathematics',
      joiningDate: '2018-06-15',
      basicSalary: 40000,
      allowances: 5000,
      deductions: 2000,
      netSalary: 43000,
      lastUpdated: '2023-01-10'
    },
    {
      id: 2,
      name: 'Sarah Johnson',
      employeeId: 'T002',
      department: 'English',
      joiningDate: '2015-07-10',
      basicSalary: 45000,
      allowances: 7000,
      deductions: 2500,
      netSalary: 49500,
      lastUpdated: '2023-01-10'
    },
    {
      id: 3,
      name: 'Robert Williams',
      employeeId: 'T003',
      department: 'Science',
      joiningDate: '2013-08-20',
      basicSalary: 50000,
      allowances: 10000,
      deductions: 3000,
      netSalary: 57000,
      lastUpdated: '2023-01-10'
    }
  ];

  // Mock salary history data
  const mockSalaryHistory = [
    {
      id: 1,
      teacherId: 1,
      teacherName: 'John Smith',
      month: 'May 2023',
      basicSalary: 40000,
      allowances: 5000,
      deductions: 2000,
      netSalary: 43000,
      paymentDate: '2023-05-28',
      paymentMethod: 'Bank Transfer',
      status: 'Paid'
    },
    {
      id: 2,
      teacherId: 2,
      teacherName: 'Sarah Johnson',
      month: 'May 2023',
      basicSalary: 45000,
      allowances: 7000,
      deductions: 2500,
      netSalary: 49500,
      paymentDate: '2023-05-28',
      paymentMethod: 'Bank Transfer',
      status: 'Paid'
    },
    {
      id: 3,
      teacherId: 3,
      teacherName: 'Robert Williams',
      month: 'May 2023',
      basicSalary: 50000,
      allowances: 10000,
      deductions: 3000,
      netSalary: 57000,
      paymentDate: '2023-05-28',
      paymentMethod: 'Bank Transfer',
      status: 'Paid'
    },
    {
      id: 4,
      teacherId: 1,
      teacherName: 'John Smith',
      month: 'April 2023',
      basicSalary: 40000,
      allowances: 5000,
      deductions: 2000,
      netSalary: 43000,
      paymentDate: '2023-04-28',
      paymentMethod: 'Bank Transfer',
      status: 'Paid'
    }
  ];

  // Load data
  useEffect(() => {
    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setTeachers(mockTeachers);
      setSalaryHistory(mockSalaryHistory);
      setLoading(false);
    }, 500);
  }, []);

  // Handle form input change
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  // Open update salary form
  const openUpdateForm = (teacher) => {
    setSelectedTeacher(teacher);
    setFormData({
      teacherId: teacher.id,
      basicSalary: teacher.basicSalary,
      allowances: teacher.allowances,
      deductions: teacher.deductions,
      effectiveDate: new Date().toISOString().split('T')[0]
    });
    setShowForm(true);
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validate form
    if (
      !formData.basicSalary ||
      !formData.effectiveDate
    ) {
      setMessage({ type: 'danger', text: 'Please fill all required fields' });
      return;
    }
    
    const basicSalary = parseFloat(formData.basicSalary);
    const allowances = parseFloat(formData.allowances) || 0;
    const deductions = parseFloat(formData.deductions) || 0;
    const netSalary = basicSalary + allowances - deductions;
    
    // Update teacher salary
    const updatedTeachers = teachers.map(teacher => {
      if (teacher.id === selectedTeacher.id) {
        return {
          ...teacher,
          basicSalary,
          allowances,
          deductions,
          netSalary,
          lastUpdated: formData.effectiveDate
        };
      }
      return teacher;
    });
    
    // Simulate API call
    setLoading(true);
    setTimeout(() => {
      setTeachers(updatedTeachers);
      setLoading(false);
      setShowForm(false);
      setSelectedTeacher(null);
      setFormData({
        teacherId: '',
        basicSalary: '',
        allowances: '',
        deductions: '',
        effectiveDate: ''
      });
      setMessage({ type: 'success', text: 'Salary updated successfully' });
    }, 500);
  };

  // Process salary payment
  const processSalaryPayment = () => {
    if (window.confirm('Are you sure you want to process salary payment for all teachers?')) {
      setLoading(true);
      
      // Simulate API call
      setTimeout(() => {
        const currentDate = new Date();
        const month = currentDate.toLocaleString('default', { month: 'long' });
        const year = currentDate.getFullYear();
        
        const newSalaryHistory = teachers.map((teacher, index) => ({
          id: salaryHistory.length + index + 1,
          teacherId: teacher.id,
          teacherName: teacher.name,
          month: `${month} ${year}`,
          basicSalary: teacher.basicSalary,
          allowances: teacher.allowances,
          deductions: teacher.deductions,
          netSalary: teacher.netSalary,
          paymentDate: currentDate.toISOString().split('T')[0],
          paymentMethod: 'Bank Transfer',
          status: 'Paid'
        }));
        
        setSalaryHistory([...newSalaryHistory, ...salaryHistory]);
        setLoading(false);
        setMessage({ type: 'success', text: 'Salary payment processed successfully' });
      }, 1000);
    }
  };

  // Generate salary slip
  const generateSalarySlip = (salary) => {
    alert(`Salary slip for ${salary.teacherName} - ${salary.month}`);
  };

  return (
    <div>
      <h1 className="mb-4">Manage Teacher Salaries</h1>

      {message && (
        <div className={`alert alert-${message.type} alert-dismissible fade show`} role="alert">
          {message.text}
          <button
            type="button"
            className="btn-close"
            onClick={() => setMessage(null)}
          ></button>
        </div>
      )}

      <ul className="nav nav-tabs mb-4">
        <li className="nav-item">
          <button
            className={`nav-link ${activeTab === 'current' ? 'active' : ''}`}
            onClick={() => setActiveTab('current')}
          >
            Current Salaries
          </button>
        </li>
        <li className="nav-item">
          <button
            className={`nav-link ${activeTab === 'history' ? 'active' : ''}`}
            onClick={() => setActiveTab('history')}
          >
            Salary History
          </button>
        </li>
      </ul>

      {activeTab === 'current' && (
        <>
          <div className="d-flex justify-content-end mb-3">
            <button
              className="btn btn-primary"
              onClick={processSalaryPayment}
              disabled={loading}
            >
              Process Salary Payment
            </button>
          </div>

          {showForm && selectedTeacher && (
            <div className="card mb-4">
              <div className="card-header bg-primary text-white">
                <h4 className="mb-0">Update Salary for {selectedTeacher.name}</h4>
              </div>
              <div className="card-body">
                <form onSubmit={handleSubmit}>
                  <div className="row">
                    <div className="col-md-4 mb-3">
                      <label htmlFor="basicSalary" className="form-label">Basic Salary *</label>
                      <input
                        type="number"
                        className="form-control"
                        id="basicSalary"
                        name="basicSalary"
                        value={formData.basicSalary}
                        onChange={handleChange}
                        required
                        min="0"
                        step="0.01"
                      />
                    </div>
                    
                    <div className="col-md-4 mb-3">
                      <label htmlFor="allowances" className="form-label">Allowances</label>
                      <input
                        type="number"
                        className="form-control"
                        id="allowances"
                        name="allowances"
                        value={formData.allowances}
                        onChange={handleChange}
                        min="0"
                        step="0.01"
                      />
                    </div>
                    
                    <div className="col-md-4 mb-3">
                      <label htmlFor="deductions" className="form-label">Deductions</label>
                      <input
                        type="number"
                        className="form-control"
                        id="deductions"
                        name="deductions"
                        value={formData.deductions}
                        onChange={handleChange}
                        min="0"
                        step="0.01"
                      />
                    </div>
                    
                    <div className="col-md-4 mb-3">
                      <label htmlFor="effectiveDate" className="form-label">Effective Date *</label>
                      <input
                        type="date"
                        className="form-control"
                        id="effectiveDate"
                        name="effectiveDate"
                        value={formData.effectiveDate}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    
                    <div className="col-md-4 mb-3">
                      <label className="form-label">Net Salary</label>
                      <input
                        type="text"
                        className="form-control"
                        value={`$${(parseFloat(formData.basicSalary || 0) + parseFloat(formData.allowances || 0) - parseFloat(formData.deductions || 0)).toFixed(2)}`}
                        readOnly
                      />
                    </div>
                  </div>
                  
                  <div className="d-flex gap-2">
                    <button type="submit" className="btn btn-success" disabled={loading}>
                      {loading ? 'Updating...' : 'Update Salary'}
                    </button>
                    <button
                      type="button"
                      className="btn btn-secondary"
                      onClick={() => {
                        setShowForm(false);
                        setSelectedTeacher(null);
                      }}
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}

          {loading && !showForm ? (
            <div className="text-center py-5">
              <div className="spinner-border" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>
          ) : (
            <div className="card">
              <div className="card-header bg-primary text-white">
                <h4 className="mb-0">Current Teacher Salaries</h4>
              </div>
              <div className="card-body">
                {teachers.length === 0 ? (
                  <div className="alert alert-info">
                    No teachers found.
                  </div>
                ) : (
                  <div className="table-responsive">
                    <table className="table table-hover">
                      <thead>
                        <tr>
                          <th>Employee ID</th>
                          <th>Name</th>
                          <th>Department</th>
                          <th>Basic Salary</th>
                          <th>Allowances</th>
                          <th>Deductions</th>
                          <th>Net Salary</th>
                          <th>Last Updated</th>
                          <th>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {teachers.map(teacher => (
                          <tr key={teacher.id}>
                            <td>{teacher.employeeId}</td>
                            <td>{teacher.name}</td>
                            <td>{teacher.department}</td>
                            <td>${teacher.basicSalary.toFixed(2)}</td>
                            <td>${teacher.allowances.toFixed(2)}</td>
                            <td>${teacher.deductions.toFixed(2)}</td>
                            <td>${teacher.netSalary.toFixed(2)}</td>
                            <td>{teacher.lastUpdated}</td>
                            <td>
                              <button
                                className="btn btn-sm btn-primary"
                                onClick={() => openUpdateForm(teacher)}
                              >
                                Update
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </div>
          )}
        </>
      )}

      {activeTab === 'history' && (
        <div className="card">
          <div className="card-header bg-primary text-white">
            <h4 className="mb-0">Salary Payment History</h4>
          </div>
          <div className="card-body">
            {loading ? (
              <div className="text-center py-5">
                <div className="spinner-border" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
              </div>
            ) : salaryHistory.length === 0 ? (
              <div className="alert alert-info">
                No salary payment history found.
              </div>
            ) : (
              <div className="table-responsive">
                <table className="table table-hover">
                  <thead>
                    <tr>
                      <th>Teacher</th>
                      <th>Month</th>
                      <th>Basic Salary</th>
                      <th>Allowances</th>
                      <th>Deductions</th>
                      <th>Net Salary</th>
                      <th>Payment Date</th>
                      <th>Status</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {salaryHistory.map(salary => (
                      <tr key={salary.id}>
                        <td>{salary.teacherName}</td>
                        <td>{salary.month}</td>
                        <td>${salary.basicSalary.toFixed(2)}</td>
                        <td>${salary.allowances.toFixed(2)}</td>
                        <td>${salary.deductions.toFixed(2)}</td>
                        <td>${salary.netSalary.toFixed(2)}</td>
                        <td>{salary.paymentDate}</td>
                        <td>
                          <span className={`badge ${salary.status === 'Paid' ? 'bg-success' : 'bg-warning'}`}>
                            {salary.status}
                          </span>
                        </td>
                        <td>
                          <button
                            className="btn btn-sm btn-primary"
                            onClick={() => generateSalarySlip(salary)}
                          >
                            Salary Slip
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageSalaries;
