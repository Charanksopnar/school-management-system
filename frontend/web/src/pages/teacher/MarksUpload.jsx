import React, { useState } from 'react';
import FileUpload from '../../components/common/FileUpload';

const MarksUpload = () => {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);
  const [formData, setFormData] = useState({
    class: '',
    section: '',
    subject: '',
    examType: '',
    file: null
  });
  const [previewData, setPreviewData] = useState(null);

  // Mock data for classes and sections
  const classes = [
    { id: 1, name: 'Class 10' },
    { id: 2, name: 'Class 9' },
    { id: 3, name: 'Class 8' }
  ];

  const sections = [
    { id: 1, name: 'A' },
    { id: 2, name: 'B' },
    { id: 3, name: 'C' }
  ];

  // Mock data for subjects
  const subjects = [
    { id: 1, name: 'Mathematics' },
    { id: 2, name: 'Science' },
    { id: 3, name: 'English' },
    { id: 4, name: 'Social Studies' }
  ];

  // Mock data for exam types
  const examTypes = [
    { id: 1, name: 'Mid-Term Examination' },
    { id: 2, name: 'Final Examination' },
    { id: 3, name: 'Weekly Test' },
    { id: 4, name: 'Unit Test' }
  ];

  // Mock student data for preview
  const mockStudents = [
    { id: 1, rollNumber: '10A01', name: 'John Doe', marks: '' },
    { id: 2, rollNumber: '10A02', name: 'Jane Smith', marks: '' },
    { id: 3, rollNumber: '10A03', name: 'Michael Johnson', marks: '' },
    { id: 4, rollNumber: '10A04', name: 'Emily Brown', marks: '' },
    { id: 5, rollNumber: '10A05', name: 'David Wilson', marks: '' }
  ];

  // Handle form input change
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  // Handle file selection
  const handleFileSelect = (file) => {
    setFormData({
      ...formData,
      file
    });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validate form
    if (
      !formData.class ||
      !formData.section ||
      !formData.subject ||
      !formData.examType
    ) {
      setMessage({ type: 'danger', text: 'Please fill all required fields' });
      return;
    }
    
    if (!formData.file) {
      setMessage({ type: 'danger', text: 'Please upload a file' });
      return;
    }
    
    setLoading(true);
    
    // Simulate file processing
    setTimeout(() => {
      setLoading(false);
      setMessage({ type: 'success', text: 'File uploaded successfully. Please review the extracted data below.' });
      
      // Show preview data (in a real app, this would be extracted from the uploaded file)
      setPreviewData(mockStudents);
    }, 1500);
  };

  // Handle marks change in preview
  const handleMarksChange = (id, value) => {
    setPreviewData(
      previewData.map(student =>
        student.id === id ? { ...student, marks: value } : student
      )
    );
  };

  // Submit final marks
  const submitMarks = () => {
    // Validate if all students have marks
    const invalidStudents = previewData.filter(student => student.marks === '');
    
    if (invalidStudents.length > 0) {
      setMessage({ type: 'danger', text: 'Please enter marks for all students' });
      return;
    }
    
    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      setMessage({ type: 'success', text: 'Marks submitted successfully' });
      setPreviewData(null);
      setFormData({
        class: '',
        section: '',
        subject: '',
        examType: '',
        file: null
      });
    }, 1000);
  };

  return (
    <div>
      <h1 className="mb-4">Upload Marks</h1>

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
        <div className="card-header bg-primary text-white">
          <h4 className="mb-0">Upload Marks File</h4>
        </div>
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            <div className="row">
              <div className="col-md-3 mb-3">
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
              
              <div className="col-md-3 mb-3">
                <label htmlFor="section" className="form-label">Section *</label>
                <select
                  className="form-select"
                  id="section"
                  name="section"
                  value={formData.section}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select Section</option>
                  {sections.map(section => (
                    <option key={section.id} value={section.name}>
                      {section.name}
                    </option>
                  ))}
                </select>
              </div>
              
              <div className="col-md-3 mb-3">
                <label htmlFor="subject" className="form-label">Subject *</label>
                <select
                  className="form-select"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select Subject</option>
                  {subjects.map(subject => (
                    <option key={subject.id} value={subject.name}>
                      {subject.name}
                    </option>
                  ))}
                </select>
              </div>
              
              <div className="col-md-3 mb-3">
                <label htmlFor="examType" className="form-label">Exam Type *</label>
                <select
                  className="form-select"
                  id="examType"
                  name="examType"
                  value={formData.examType}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select Exam Type</option>
                  {examTypes.map(type => (
                    <option key={type.id} value={type.name}>
                      {type.name}
                    </option>
                  ))}
                </select>
              </div>
              
              <div className="col-md-12 mb-3">
                <FileUpload
                  onFileSelect={handleFileSelect}
                  acceptedFileTypes={['xls', 'xlsx', 'csv']}
                  maxFileSize={5}
                  label="Upload Marks File (Excel or CSV) *"
                />
                <small className="form-text text-muted">
                  The file should contain columns for Roll Number, Student Name, and Marks.
                </small>
              </div>
              
              <div className="col-md-12">
                <button type="submit" className="btn btn-primary" disabled={loading}>
                  {loading ? 'Processing...' : 'Upload and Process'}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>

      {previewData && (
        <div className="card">
          <div className="card-header bg-primary text-white">
            <h4 className="mb-0">Review and Confirm Marks</h4>
          </div>
          <div className="card-body">
            <div className="alert alert-info">
              <p className="mb-0">
                <strong>Class:</strong> {formData.class} {formData.section} | 
                <strong> Subject:</strong> {formData.subject} | 
                <strong> Exam:</strong> {formData.examType}
              </p>
            </div>
            
            <div className="table-responsive">
              <table className="table table-hover">
                <thead>
                  <tr>
                    <th>Roll Number</th>
                    <th>Student Name</th>
                    <th>Marks</th>
                  </tr>
                </thead>
                <tbody>
                  {previewData.map(student => (
                    <tr key={student.id}>
                      <td>{student.rollNumber}</td>
                      <td>{student.name}</td>
                      <td>
                        <input
                          type="number"
                          className="form-control"
                          value={student.marks}
                          onChange={(e) => handleMarksChange(student.id, e.target.value)}
                          min="0"
                          max="100"
                          required
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            <div className="mt-3">
              <button
                className="btn btn-success"
                onClick={submitMarks}
                disabled={loading}
              >
                {loading ? 'Submitting...' : 'Confirm and Submit Marks'}
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="card mt-4">
        <div className="card-header bg-primary text-white">
          <h4 className="mb-0">Download Templates</h4>
        </div>
        <div className="card-body">
          <p>Download the following templates to fill in student marks:</p>
          <div className="row">
            <div className="col-md-4 mb-3">
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">Excel Template</h5>
                  <p className="card-text">Standard Excel template for marks entry</p>
                  <button className="btn btn-primary">Download Excel</button>
                </div>
              </div>
            </div>
            <div className="col-md-4 mb-3">
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">CSV Template</h5>
                  <p className="card-text">CSV format for marks entry</p>
                  <button className="btn btn-primary">Download CSV</button>
                </div>
              </div>
            </div>
            <div className="col-md-4 mb-3">
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">Word Template</h5>
                  <p className="card-text">Word document for marks entry</p>
                  <button className="btn btn-primary">Download Word</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MarksUpload;
