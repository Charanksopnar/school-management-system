import React, { useState, useEffect } from 'react';

const ViewResults = () => {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedExamType, setSelectedExamType] = useState('all');
  
  // Mock results data
  const mockResults = [
    {
      id: 1,
      examName: 'Mid-Term Examination',
      examType: 'mid-term',
      subject: 'Mathematics',
      examDate: '2023-05-15',
      totalMarks: 100,
      marksObtained: 85,
      grade: 'A',
      remarks: 'Excellent performance'
    },
    {
      id: 2,
      examName: 'Mid-Term Examination',
      examType: 'mid-term',
      subject: 'Science',
      examDate: '2023-05-16',
      totalMarks: 100,
      marksObtained: 78,
      grade: 'B+',
      remarks: 'Good performance'
    },
    {
      id: 3,
      examName: 'Mid-Term Examination',
      examType: 'mid-term',
      subject: 'English',
      examDate: '2023-05-17',
      totalMarks: 100,
      marksObtained: 92,
      grade: 'A+',
      remarks: 'Outstanding performance'
    },
    {
      id: 4,
      examName: 'Weekly Test',
      examType: 'weekly',
      subject: 'Mathematics',
      examDate: '2023-04-10',
      totalMarks: 50,
      marksObtained: 42,
      grade: 'A',
      remarks: 'Good job'
    },
    {
      id: 5,
      examName: 'Weekly Test',
      examType: 'weekly',
      subject: 'Science',
      examDate: '2023-04-12',
      totalMarks: 50,
      marksObtained: 38,
      grade: 'B+',
      remarks: 'Good effort'
    }
  ];

  // Load results
  useEffect(() => {
    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      // Filter results based on selected exam type
      const filteredResults = selectedExamType === 'all'
        ? mockResults
        : mockResults.filter(result => result.examType === selectedExamType);
      
      setResults(filteredResults);
      setLoading(false);
    }, 500);
  }, [selectedExamType]);

  // Calculate overall performance
  const calculateOverallPerformance = () => {
    if (results.length === 0) return { percentage: 0, grade: 'N/A' };
    
    const totalMarksSum = results.reduce((sum, result) => sum + result.totalMarks, 0);
    const marksObtainedSum = results.reduce((sum, result) => sum + result.marksObtained, 0);
    
    const percentage = ((marksObtainedSum / totalMarksSum) * 100).toFixed(2);
    
    let grade = 'F';
    if (percentage >= 90) grade = 'A+';
    else if (percentage >= 80) grade = 'A';
    else if (percentage >= 70) grade = 'B+';
    else if (percentage >= 60) grade = 'B';
    else if (percentage >= 50) grade = 'C';
    else if (percentage >= 40) grade = 'D';
    
    return { percentage, grade };
  };

  // Group results by exam name
  const groupResultsByExam = () => {
    const groupedResults = {};
    
    results.forEach(result => {
      if (!groupedResults[result.examName]) {
        groupedResults[result.examName] = [];
      }
      groupedResults[result.examName].push(result);
    });
    
    return groupedResults;
  };

  const performance = calculateOverallPerformance();
  const groupedResults = groupResultsByExam();

  return (
    <div>
      <h1 className="mb-4">My Results</h1>

      <div className="card mb-4">
        <div className="card-body">
          <div className="row">
            <div className="col-md-4 mb-3">
              <label htmlFor="examType" className="form-label">Filter by Exam Type</label>
              <select
                className="form-select"
                id="examType"
                value={selectedExamType}
                onChange={(e) => setSelectedExamType(e.target.value)}
              >
                <option value="all">All Exams</option>
                <option value="mid-term">Mid-Term Examinations</option>
                <option value="final">Final Examinations</option>
                <option value="weekly">Weekly Tests</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {loading ? (
        <div className="text-center py-5">
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      ) : (
        <>
          <div className="row mb-4">
            <div className="col-md-12">
              <div className="card">
                <div className="card-header bg-primary text-white">
                  <h4 className="mb-0">Overall Performance</h4>
                </div>
                <div className="card-body">
                  <div className="row text-center">
                    <div className="col-md-4 mb-3">
                      <h5>Average Percentage</h5>
                      <div className="h1">{performance.percentage}%</div>
                    </div>
                    <div className="col-md-4 mb-3">
                      <h5>Overall Grade</h5>
                      <div className="h1">{performance.grade}</div>
                    </div>
                    <div className="col-md-4 mb-3">
                      <h5>Total Exams</h5>
                      <div className="h1">{results.length}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {Object.keys(groupedResults).length === 0 ? (
            <div className="alert alert-info">
              No results found for the selected exam type.
            </div>
          ) : (
            Object.entries(groupedResults).map(([examName, examResults]) => (
              <div className="card mb-4" key={examName}>
                <div className="card-header bg-primary text-white">
                  <h4 className="mb-0">{examName}</h4>
                </div>
                <div className="card-body">
                  <div className="table-responsive">
                    <table className="table table-hover">
                      <thead>
                        <tr>
                          <th>Subject</th>
                          <th>Date</th>
                          <th>Total Marks</th>
                          <th>Marks Obtained</th>
                          <th>Percentage</th>
                          <th>Grade</th>
                          <th>Remarks</th>
                        </tr>
                      </thead>
                      <tbody>
                        {examResults.map(result => (
                          <tr key={result.id}>
                            <td>{result.subject}</td>
                            <td>{new Date(result.examDate).toLocaleDateString()}</td>
                            <td>{result.totalMarks}</td>
                            <td>{result.marksObtained}</td>
                            <td>{((result.marksObtained / result.totalMarks) * 100).toFixed(2)}%</td>
                            <td>{result.grade}</td>
                            <td>{result.remarks}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            ))
          )}
        </>
      )}
    </div>
  );
};

export default ViewResults;
