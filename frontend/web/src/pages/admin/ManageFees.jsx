import React, { useState, useEffect } from 'react';

const ManageFees = () => {
  const [feeStructures, setFeeStructures] = useState([]);
  const [feeTransactions, setFeeTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('structure');
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    class: '',
    academicYear: '',
    feeType: '',
    amount: '',
    dueDate: ''
  });
  const [message, setMessage] = useState(null);

  // Mock data for classes
  const classes = [
    { id: 1, name: 'Class 10' },
    { id: 2, name: 'Class 9' },
    { id: 3, name: 'Class 8' }
  ];

  // Mock data for fee types
  const feeTypes = [
    { id: 1, name: 'Tuition Fee' },
    { id: 2, name: 'Transportation Fee' },
    { id: 3, name: 'Examination Fee' },
    { id: 4, name: 'Library Fee' },
    { id: 5, name: 'Laboratory Fee' }
  ];

  // Mock fee structure data
  const mockFeeStructures = [
    {
      id: 1,
      class: 'Class 10',
      academicYear: '2023-2024',
      feeType: 'Tuition Fee',
      amount: 5000,
      dueDate: '2023-07-15',
      createdAt: '2023-06-01'
    },
    {
      id: 2,
      class: 'Class 10',
      academicYear: '2023-2024',
      feeType: 'Transportation Fee',
      amount: 2000,
      dueDate: '2023-07-15',
      createdAt: '2023-06-01'
    },
    {
      id: 3,
      class: 'Class 9',
      academicYear: '2023-2024',
      feeType: 'Tuition Fee',
      amount: 4500,
      dueDate: '2023-07-15',
      createdAt: '2023-06-01'
    },
    {
      id: 4,
      class: 'Class 9',
      academicYear: '2023-2024',
      feeType: 'Examination Fee',
      amount: 1000,
      dueDate: '2023-08-10',
      createdAt: '2023-06-01'
    }
  ];

  // Mock fee transaction data
  const mockFeeTransactions = [
    {
      id: 1,
      student: 'John Doe',
      class: 'Class 10',
      feeType: 'Tuition Fee',
      amount: 5000,
      paidAmount: 5000,
      dueDate: '2023-07-15',
      paymentDate: '2023-07-10',
      status: 'Paid',
      paymentMethod: 'Online Transfer',
      receiptNumber: 'REC001'
    },
    {
      id: 2,
      student: 'Jane Smith',
      class: 'Class 10',
      feeType: 'Tuition Fee',
      amount: 5000,
      paidAmount: 2500,
      dueDate: '2023-07-15',
      paymentDate: '2023-07-05',
      status: 'Partial',
      paymentMethod: 'Cash',
      receiptNumber: 'REC002'
    },
    {
      id: 3,
      student: 'Michael Johnson',
      class: 'Class 9',
      feeType: 'Tuition Fee',
      amount: 4500,
      paidAmount: 0,
      dueDate: '2023-07-15',
      paymentDate: null,
      status: 'Unpaid',
      paymentMethod: null,
      receiptNumber: null
    }
  ];

  // Load data
  useEffect(() => {
    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setFeeStructures(mockFeeStructures);
      setFeeTransactions(mockFeeTransactions);
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

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validate form
    if (
      !formData.class ||
      !formData.academicYear ||
      !formData.feeType ||
      !formData.amount ||
      !formData.dueDate
    ) {
      setMessage({ type: 'danger', text: 'Please fill all fields' });
      return;
    }
    
    // Create new fee structure
    const newFeeStructure = {
      id: feeStructures.length + 1,
      ...formData,
      amount: parseFloat(formData.amount),
      createdAt: new Date().toISOString().split('T')[0]
    };
    
    // Simulate API call
    setLoading(true);
    setTimeout(() => {
      setFeeStructures([...feeStructures, newFeeStructure]);
      setLoading(false);
      setShowForm(false);
      setFormData({
        class: '',
        academicYear: '',
        feeType: '',
        amount: '',
        dueDate: ''
      });
      setMessage({ type: 'success', text: 'Fee structure added successfully' });
    }, 500);
  };

  // Delete fee structure
  const deleteFeeStructure = (id) => {
    if (window.confirm('Are you sure you want to delete this fee structure?')) {
      setLoading(true);
      
      // Simulate API call
      setTimeout(() => {
        setFeeStructures(feeStructures.filter(fee => fee.id !== id));
        setLoading(false);
        setMessage({ type: 'success', text: 'Fee structure deleted successfully' });
      }, 500);
    }
  };

  // Generate receipt
  const generateReceipt = (transaction) => {
    alert(`Receipt for ${transaction.student} - ${transaction.feeType} - ${transaction.receiptNumber}`);
  };

  return (
    <div>
      <h1 className="mb-4">Manage Fees</h1>

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
            className={`nav-link ${activeTab === 'structure' ? 'active' : ''}`}
            onClick={() => setActiveTab('structure')}
          >
            Fee Structure
          </button>
        </li>
        <li className="nav-item">
          <button
            className={`nav-link ${activeTab === 'transactions' ? 'active' : ''}`}
            onClick={() => setActiveTab('transactions')}
          >
            Fee Transactions
          </button>
        </li>
      </ul>

      {activeTab === 'structure' && (
        <>
          <div className="d-flex justify-content-end mb-3">
            <button
              className="btn btn-primary"
              onClick={() => setShowForm(!showForm)}
            >
              {showForm ? 'Cancel' : 'Add New Fee Structure'}
            </button>
          </div>

          {showForm && (
            <div className="card mb-4">
              <div className="card-header bg-primary text-white">
                <h4 className="mb-0">Add New Fee Structure</h4>
              </div>
              <div className="card-body">
                <form onSubmit={handleSubmit}>
                  <div className="row">
                    <div className="col-md-6 mb-3">
                      <label htmlFor="class" className="form-label">Class *</label>
                      <select
                        className="form-select"
                        id="class"
                        name="class"
                        value={formData.class}
                        onChange={handleChange}
                        required
                      >
                        <option value="">Select Class</option>
                        {classes.map(cls => (
                          <option key={cls.id} value={cls.name}>
                            {cls.name}
                          </option>
                        ))}
                      </select>
                    </div>
                    
                    <div className="col-md-6 mb-3">
                      <label htmlFor="academicYear" className="form-label">Academic Year *</label>
                      <input
                        type="text"
                        className="form-control"
                        id="academicYear"
                        name="academicYear"
                        value={formData.academicYear}
                        onChange={handleChange}
                        required
                        placeholder="e.g. 2023-2024"
                      />
                    </div>
                    
                    <div className="col-md-4 mb-3">
                      <label htmlFor="feeType" className="form-label">Fee Type *</label>
                      <select
                        className="form-select"
                        id="feeType"
                        name="feeType"
                        value={formData.feeType}
                        onChange={handleChange}
                        required
                      >
                        <option value="">Select Fee Type</option>
                        {feeTypes.map(type => (
                          <option key={type.id} value={type.name}>
                            {type.name}
                          </option>
                        ))}
                      </select>
                    </div>
                    
                    <div className="col-md-4 mb-3">
                      <label htmlFor="amount" className="form-label">Amount *</label>
                      <input
                        type="number"
                        className="form-control"
                        id="amount"
                        name="amount"
                        value={formData.amount}
                        onChange={handleChange}
                        required
                        min="0"
                        step="0.01"
                      />
                    </div>
                    
                    <div className="col-md-4 mb-3">
                      <label htmlFor="dueDate" className="form-label">Due Date *</label>
                      <input
                        type="date"
                        className="form-control"
                        id="dueDate"
                        name="dueDate"
                        value={formData.dueDate}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>
                  
                  <button type="submit" className="btn btn-success" disabled={loading}>
                    {loading ? 'Saving...' : 'Save Fee Structure'}
                  </button>
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
                <h4 className="mb-0">Fee Structure</h4>
              </div>
              <div className="card-body">
                {feeStructures.length === 0 ? (
                  <div className="alert alert-info">
                    No fee structures found.
                  </div>
                ) : (
                  <div className="table-responsive">
                    <table className="table table-hover">
                      <thead>
                        <tr>
                          <th>Class</th>
                          <th>Academic Year</th>
                          <th>Fee Type</th>
                          <th>Amount</th>
                          <th>Due Date</th>
                          <th>Created At</th>
                          <th>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {feeStructures.map(fee => (
                          <tr key={fee.id}>
                            <td>{fee.class}</td>
                            <td>{fee.academicYear}</td>
                            <td>{fee.feeType}</td>
                            <td>${fee.amount.toFixed(2)}</td>
                            <td>{fee.dueDate}</td>
                            <td>{fee.createdAt}</td>
                            <td>
                              <button
                                className="btn btn-sm btn-danger"
                                onClick={() => deleteFeeStructure(fee.id)}
                              >
                                Delete
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

      {activeTab === 'transactions' && (
        <div className="card">
          <div className="card-header bg-primary text-white">
            <h4 className="mb-0">Fee Transactions</h4>
          </div>
          <div className="card-body">
            {loading ? (
              <div className="text-center py-5">
                <div className="spinner-border" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
              </div>
            ) : feeTransactions.length === 0 ? (
              <div className="alert alert-info">
                No fee transactions found.
              </div>
            ) : (
              <div className="table-responsive">
                <table className="table table-hover">
                  <thead>
                    <tr>
                      <th>Student</th>
                      <th>Class</th>
                      <th>Fee Type</th>
                      <th>Amount</th>
                      <th>Paid</th>
                      <th>Due Date</th>
                      <th>Payment Date</th>
                      <th>Status</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {feeTransactions.map(transaction => (
                      <tr key={transaction.id}>
                        <td>{transaction.student}</td>
                        <td>{transaction.class}</td>
                        <td>{transaction.feeType}</td>
                        <td>${transaction.amount.toFixed(2)}</td>
                        <td>${transaction.paidAmount.toFixed(2)}</td>
                        <td>{transaction.dueDate}</td>
                        <td>{transaction.paymentDate || '-'}</td>
                        <td>
                          <span className={`badge ${
                            transaction.status === 'Paid' ? 'bg-success' :
                            transaction.status === 'Partial' ? 'bg-warning' : 'bg-danger'
                          }`}>
                            {transaction.status}
                          </span>
                        </td>
                        <td>
                          {transaction.status !== 'Unpaid' && (
                            <button
                              className="btn btn-sm btn-primary"
                              onClick={() => generateReceipt(transaction)}
                            >
                              Receipt
                            </button>
                          )}
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

export default ManageFees;
