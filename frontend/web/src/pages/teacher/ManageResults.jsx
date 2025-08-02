import React, { useState, useEffect } from 'react';

const ManageResults = () => {
  const [selectedClass, setSelectedClass] = useState('');
  const [selectedSection, setSelectedSection] = useState('');
  const [selectedExam, setSelectedExam] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('');
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);

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

  // Mock data for exams
  const exams = [
    { id: 1, name: 'Mid-Term Examination' },
    { id: 2, name: 'Final Examination' },
    { id: 3, name: 'Weekly Test' }
  ];

  // Mock data for subjects
  const subjects = [
    { id: 1, name: 'Mathematics' },
    { id: 2, name: 'Science' },
    { id: 3, name: 'English' },
    { id: 4, name: 'Social Studies' }
  ];

  // Mock student data
  const mockStudents = [
    { id: 1, name: 'John Doe', rollNumber: '10A01' },
    { id: 2, name: 'Jane Smith', rollNumber: '10A02' },
    { id: 3, name: 'Michael Johnson', rollNumber: '10A03' },
    { id: 4, name: 'Emily Brown', rollNumber: '10A04' },
    { id: 5, name: 'David Wilson', rollNumber: '10A05' },
    { id: 6, name: 'Sarah Taylor', rollNumber: '10A06' },
    { id: 7, name: 'James Anderson', rollNumber: '10A07' },
    { id: 8, name: 'Olivia Martinez', rollNumber: '10A08' },
    { id: 9, name: 'Robert Garcia', rollNumber: '10A09' },
    { id: 10, name: 'Sophia Robinson', rollNumber: '10A10' }
  ];

  // Load students when class, section, exam, and subject are selected
  const loadStudents = () => {
    if (!selectedClass || !selectedSection || !selectedExam || !selectedSubject) {
      setMessage({ type: 'danger', text: 'Please select all fields' });
      return;
    }

    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      // Initialize students with default marks
      const studentsWithMarks = mockStudents.map(student => ({
        ...student,
        marksObtained: '',
        remarks: ''
      }));
      
      setStudents(studentsWithMarks);
      setLoading(false);
      setMessage(null);
    }, 500);
  };

  // Handle marks change
  const handleMarksChange = (studentId, value) => {
    setStudents(
      students.map(student =>
        student.id === studentId ? { ...student, marksObtained: value } : student
      )
    );
  };

  // Handle remarks change
  const handleRemarksChange = (studentId, value) => {
    setStudents(
      students.map(student =>
        student.id === studentId ? { ...student, remarks: value } : student
      )
    );
  };

  // Submit results
  const submitResults = () => {
    // Validate if all students have marks
    const invalidStudents = students.filter(student => student.marksObtained === '');
    
    if (invalidStudents.length > 0) {
      setMessage({ type: 'danger', text: 'Please enter marks for all students' });
      return;
    }

    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      setMessage({ 
        type: 'success', 
        text: `Results for ${selectedClass} ${selectedSection} - ${selectedExam} - ${selectedSubject} have been saved successfully` 
      });
      
      // Reset form
      setStudents([]);
      setSelectedClass('');
      setSelectedSection('');
      setSelectedExam('');
      setSelectedSubject('');
    }, 1000);
  };

  return (
    <div>
      <h1 className="mb-4">Manage Results</h1>

      {message && (
        <div className={`alert alert-${message.type}`} role="alert">
          {message.text}
        </div>
      )}

      <div className="card mb-4">
        <div className="card-body">
          <div className="row">
            <div className="col-md-3 mb-3">
              <label htmlFor="class" className="form-label">Class</label>
              <select
                className="form-select"
                id="class"
                value={selectedClass}
                onChange={(e) => setSelectedClass(e.target.value)}
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
              <label htmlFor="section" className="form-label">Section</label>
              <select
                className="form-select"
                id="section"
                value={selectedSection}
                onChange={(e) => setSelectedSection(e.target.value)}
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
              <label htmlFor="exam" className="form-label">Exam</label>
              <select
                className="form-select"
                id="exam"
                value={selectedExam}
                onChange={(e) => setSelectedExam(e.target.value)}
              >
                <option value="">Select Exam</option>
                {exams.map(exam => (
                  <option key={exam.id} value={exam.name}>
                    {exam.name}
                  </option>
                ))}
              </select>
            </div>
            
            <div className="col-md-3 mb-3">
              <label htmlFor="subject" className="form-label">Subject</label>
              <select
                className="form-select"
                id="subject"
                value={selectedSubject}
                onChange={(e) => setSelectedSubject(e.target.value)}
              >
                <option value="">Select Subject</option>
                {subjects.map(subject => (
                  <option key={subject.id} value={subject.name}>
                    {subject.name}
                  </option>
                ))}
              </select>
            </div>
            
            <div className="col-12 text-end">
              <button
                className="btn btn-primary"
                onClick={loadStudents}
                disabled={loading}
              >
                {loading ? 'Loading...' : 'Load Students'}
              </button>
            </div>
          </div>
        </div>
      </div>

      {students.length > 0 && (
        <div className="card">
          <div className="card-header bg-primary text-white">
            <h4 className="mb-0">
              Enter Results for {selectedClass} {selectedSection} - {selectedExam} - {selectedSubject}
            </h4>
          </div>
          <div className="card-body">
            <div className="table-responsive">
              <table className="table table-hover">
                <thead>
                  <tr>
                    <th>Roll No.</th>
                    <th>Name</th>
                    <th>Marks Obtained</th>
                    <th>Remarks</th>
                  </tr>
                </thead>
                <tbody>
                  {students.map(student => (
                    <tr key={student.id}>
                      <td>{student.rollNumber}</td>
                      <td>{student.name}</td>
                      <td>
                        <input
                          type="number"
                          className="form-control"
                          value={student.marksObtained}
                          onChange={(e) => handleMarksChange(student.id, e.target.value)}
                          min="0"
                          max="100"
                          required
                        />
                      </td>
                      <td>
                        <input
                          type="text"
                          className="form-control"
                          value={student.remarks}
                          onChange={(e) => handleRemarksChange(student.id, e.target.value)}
                          placeholder="Add remarks"
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            <button
              className="btn btn-success mt-3"
              onClick={submitResults}
              disabled={loading}
            >
              {loading ? 'Saving...' : 'Save Results'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageResults;
