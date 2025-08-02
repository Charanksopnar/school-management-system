import React, { useState, useEffect } from 'react';

const ViewFeeStatus = () => {
  const [feeData, setFeeData] = useState([]);
  const [feeHistory, setFeeHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('current');
  const [selectedChild, setSelectedChild] = useState('all');
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [selectedFee, setSelectedFee] = useState(null);
  const [paymentAmount, setPaymentAmount] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('credit_card');
  const [message, setMessage] = useState(null);

  // Mock children data
  const children = [
    { id: 1, name: 'John Doe', class: 'Class 10A' },
    { id: 2, name: 'Jane Doe', class: 'Class 8B' }
  ];

  // Mock fee data
  const mockFeeData = [
    {
      id: 1,
      childId: 1,
      childName: 'John Doe',
      class: 'Class 10A',
      feeType: 'Tuition Fee',
      amount: 5000,
      dueDate: '2023-07-15',
      status: 'Unpaid',
      paidAmount: 0,
      balance: 5000
    },
    {
      id: 2,
      childId: 1,
      childName: 'John Doe',
      class: 'Class 10A',
      feeType: 'Transportation Fee',
      amount: 2000,
      dueDate: '2023-07-15',
      status: 'Partial',
      paidAmount: 1000,
      balance: 1000
    },
    {
      id: 3,
      childId: 2,
      childName: 'Jane Doe',
      class: 'Class 8B',
      feeType: 'Tuition Fee',
      amount: 4500,
      dueDate: '2023-07-15',
      status: 'Paid',
      paidAmount: 4500,
      balance: 0
    },
    {
      id: 4,
      childId: 2,
      childName: 'Jane Doe',
      class: 'Class 8B',
      feeType: 'Examination Fee',
      amount: 1000,
      dueDate: '2023-08-10',
      status: 'Unpaid',
      paidAmount: 0,
      balance: 1000
    }
  ];

  // Mock fee payment history
  const mockFeeHistory = [
    {
      id: 1,
      childId: 1,
      childName: 'John Doe',
      class: 'Class 10A',
      feeType: 'Transportation Fee',
      amount: 1000,
      paymentDate: '2023-06-20',
      paymentMethod: 'Credit Card',
      transactionId: 'TXN123456',
      receiptNumber: 'REC001'
    },
    {
      id: 2,
      childId: 2,
      childName: 'Jane Doe',
      class: 'Class 8B',
      feeType: 'Tuition Fee',
      amount: 4500,
      paymentDate: '2023-06-15',
      paymentMethod: 'Bank Transfer',
      transactionId: 'TXN123457',
      receiptNumber: 'REC002'
    }
  ];

  // Load fee data
  useEffect(() => {
    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setFeeData(mockFeeData);
      setFeeHistory(mockFeeHistory);
      setLoading(false);
    }, 500);
  }, []);

  // Filter fee data based on selected child
  const filteredFeeData = feeData.filter(fee => {
    return selectedChild === 'all' || fee.childId === parseInt(selectedChild);
  });

  // Filter fee history based on selected child
  const filteredFeeHistory = feeHistory.filter(fee => {
    return selectedChild === 'all' || fee.childId === parseInt(selectedChild);
  });

  // Calculate total due amount
  const totalDueAmount = filteredFeeData.reduce((total, fee) => total + fee.balance, 0);

  // Open payment modal
  const openPaymentModal = (fee) => {
    setSelectedFee(fee);
    setPaymentAmount(fee.balance.toString());
    setShowPaymentModal(true);
  };

  // Handle payment
  const handlePayment = (e) => {
    e.preventDefault();
    
    if (!paymentAmount || parseFloat(paymentAmount) <= 0) {
      setMessage({ type: 'danger', text: 'Please enter a valid payment amount' });
      return;
    }
    
    if (parseFloat(paymentAmount) > selectedFee.balance) {
      setMessage({ type: 'danger', text: 'Payment amount cannot exceed the balance' });
      return;
    }
    
    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      // Update fee data
      const updatedFeeData = feeData.map(fee => {
        if (fee.id === selectedFee.id) {
          const newPaidAmount = fee.paidAmount + parseFloat(paymentAmount);
          const newBalance = fee.amount - newPaidAmount;
          const newStatus = newBalance === 0 ? 'Paid' : newBalance < fee.amount ? 'Partial' : 'Unpaid';
          
          return {
            ...fee,
            paidAmount: newPaidAmount,
            balance: newBalance,
            status: newStatus
          };
        }
        return fee;
      });
      
      // Add to payment history
      const newPayment = {
        id: feeHistory.length + 1,
        childId: selectedFee.childId,
        childName: selectedFee.childName,
        class: selectedFee.class,
        feeType: selectedFee.feeType,
        amount: parseFloat(paymentAmount),
        paymentDate: new Date().toISOString().split('T')[0],
        paymentMethod: paymentMethod === 'credit_card' ? 'Credit Card' : 
                       paymentMethod === 'bank_transfer' ? 'Bank Transfer' : 'Cash',
        transactionId: `TXN${Math.floor(Math.random() * 1000000)}`,
        receiptNumber: `REC${feeHistory.length + 1}`.padStart(6, '0')
      };
      
      setFeeData(updatedFeeData);
      setFeeHistory([newPayment, ...feeHistory]);
      setLoading(false);
      setShowPaymentModal(false);
      setSelectedFee(null);
      setPaymentAmount('');
      setPaymentMethod('credit_card');
      setMessage({ type: 'success', text: 'Payment successful! Receipt generated.' });
    }, 1000);
  };

  // Generate receipt
  const generateReceipt = (payment) => {
    alert(`Receipt for ${payment.childName} - ${payment.feeType} - ${payment.receiptNumber}`);
  };

  return (
    <div>
      <h1 className="mb-4">Fee Status</h1>

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

      <div className="card mb-4">
        <div className="card-body">
          <div className="row">
            <div className="col-md-6 mb-3">
              <label htmlFor="childSelect" className="form-label">Select Child</label>
              <select
                className="form-select"
                id="childSelect"
                value={selectedChild}
                onChange={(e) => setSelectedChild(e.target.value)}
              >
                <option value="all">All Children</option>
                {children.map(child => (
                  <option key={child.id} value={child.id}>
                    {child.name} ({child.class})
                  </option>
                ))}
              </select>
            </div>
            
            <div className="col-md-6 mb-3">
              <label className="form-label">Total Due Amount</label>
              <div className="input-group">
                <span className="input-group-text">$</span>
                <input
                  type="text"
                  className="form-control"
                  value={totalDueAmount.toFixed(2)}
                  readOnly
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <ul className="nav nav-tabs mb-4">
        <li className="nav-item">
          <button
            className={`nav-link ${activeTab === 'current' ? 'active' : ''}`}
            onClick={() => setActiveTab('current')}
          >
            Current Fees
          </button>
        </li>
        <li className="nav-item">
          <button
            className={`nav-link ${activeTab === 'history' ? 'active' : ''}`}
            onClick={() => setActiveTab('history')}
          >
            Payment History
          </button>
        </li>
      </ul>

      {loading ? (
        <div className="text-center py-5">
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      ) : activeTab === 'current' ? (
        <div className="card">
          <div className="card-header bg-primary text-white">
            <h4 className="mb-0">Current Fees</h4>
          </div>
          <div className="card-body">
            {filteredFeeData.length === 0 ? (
              <div className="alert alert-info">
                No fee data found.
              </div>
            ) : (
              <div className="table-responsive">
                <table className="table table-hover">
                  <thead>
                    <tr>
                      <th>Child</th>
                      <th>Class</th>
                      <th>Fee Type</th>
                      <th>Amount</th>
                      <th>Paid</th>
                      <th>Balance</th>
                      <th>Due Date</th>
                      <th>Status</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredFeeData.map(fee => (
                      <tr key={fee.id}>
                        <td>{fee.childName}</td>
                        <td>{fee.class}</td>
                        <td>{fee.feeType}</td>
                        <td>${fee.amount.toFixed(2)}</td>
                        <td>${fee.paidAmount.toFixed(2)}</td>
                        <td>${fee.balance.toFixed(2)}</td>
                        <td>{fee.dueDate}</td>
                        <td>
                          <span className={`badge ${
                            fee.status === 'Paid' ? 'bg-success' :
                            fee.status === 'Partial' ? 'bg-warning' : 'bg-danger'
                          }`}>
                            {fee.status}
                          </span>
                        </td>
                        <td>
                          {fee.status !== 'Paid' && (
                            <button
                              className="btn btn-sm btn-primary"
                              onClick={() => openPaymentModal(fee)}
                            >
                              Pay Now
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
      ) : (
        <div className="card">
          <div className="card-header bg-primary text-white">
            <h4 className="mb-0">Payment History</h4>
          </div>
          <div className="card-body">
            {filteredFeeHistory.length === 0 ? (
              <div className="alert alert-info">
                No payment history found.
              </div>
            ) : (
              <div className="table-responsive">
                <table className="table table-hover">
                  <thead>
                    <tr>
                      <th>Child</th>
                      <th>Class</th>
                      <th>Fee Type</th>
                      <th>Amount</th>
                      <th>Payment Date</th>
                      <th>Payment Method</th>
                      <th>Receipt</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredFeeHistory.map(payment => (
                      <tr key={payment.id}>
                        <td>{payment.childName}</td>
                        <td>{payment.class}</td>
                        <td>{payment.feeType}</td>
                        <td>${payment.amount.toFixed(2)}</td>
                        <td>{payment.paymentDate}</td>
                        <td>{payment.paymentMethod}</td>
                        <td>
                          <button
                            className="btn btn-sm btn-primary"
                            onClick={() => generateReceipt(payment)}
                          >
                            View Receipt
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

      {/* Payment Modal */}
      {showPaymentModal && selectedFee && (
        <div className="modal show d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Make Payment</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => {
                    setShowPaymentModal(false);
                    setSelectedFee(null);
                  }}
                ></button>
              </div>
              <div className="modal-body">
                <form onSubmit={handlePayment}>
                  <div className="mb-3">
                    <p><strong>Child:</strong> {selectedFee.childName}</p>
                    <p><strong>Fee Type:</strong> {selectedFee.feeType}</p>
                    <p><strong>Total Amount:</strong> ${selectedFee.amount.toFixed(2)}</p>
                    <p><strong>Balance Due:</strong> ${selectedFee.balance.toFixed(2)}</p>
                  </div>
                  
                  <div className="mb-3">
                    <label htmlFor="paymentAmount" className="form-label">Payment Amount</label>
                    <div className="input-group">
                      <span className="input-group-text">$</span>
                      <input
                        type="number"
                        className="form-control"
                        id="paymentAmount"
                        value={paymentAmount}
                        onChange={(e) => setPaymentAmount(e.target.value)}
                        min="0.01"
                        max={selectedFee.balance}
                        step="0.01"
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="mb-3">
                    <label htmlFor="paymentMethod" className="form-label">Payment Method</label>
                    <select
                      className="form-select"
                      id="paymentMethod"
                      value={paymentMethod}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                      required
                    >
                      <option value="credit_card">Credit Card</option>
                      <option value="bank_transfer">Bank Transfer</option>
                      <option value="cash">Cash</option>
                    </select>
                  </div>
                  
                  <div className="d-grid">
                    <button type="submit" className="btn btn-primary" disabled={loading}>
                      {loading ? 'Processing...' : 'Pay Now'}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ViewFeeStatus;
