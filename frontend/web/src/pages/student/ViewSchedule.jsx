import React, { useState, useEffect } from 'react';

const ViewSchedule = () => {
  const [schedule, setSchedule] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedDay, setSelectedDay] = useState('Monday');
  
  // Mock schedule data
  const mockSchedule = {
    Monday: [
      { period: 1, time: '8:00 AM - 9:00 AM', subject: 'Mathematics', teacher: 'Mr. Johnson', room: '101' },
      { period: 2, time: '9:00 AM - 10:00 AM', subject: 'Science', teacher: 'Ms. Smith', room: '102' },
      { period: 3, time: '10:15 AM - 11:15 AM', subject: 'English', teacher: 'Mrs. Davis', room: '103' },
      { period: 4, time: '11:15 AM - 12:15 PM', subject: 'Social Studies', teacher: 'Mr. Wilson', room: '104' },
      { period: 5, time: '1:00 PM - 2:00 PM', subject: 'Computer Science', teacher: 'Ms. Brown', room: '105' },
      { period: 6, time: '2:00 PM - 3:00 PM', subject: 'Physical Education', teacher: 'Mr. Taylor', room: 'Gym' }
    ],
    Tuesday: [
      { period: 1, time: '8:00 AM - 9:00 AM', subject: 'Science', teacher: 'Ms. Smith', room: '102' },
      { period: 2, time: '9:00 AM - 10:00 AM', subject: 'Mathematics', teacher: 'Mr. Johnson', room: '101' },
      { period: 3, time: '10:15 AM - 11:15 AM', subject: 'History', teacher: 'Mr. Wilson', room: '104' },
      { period: 4, time: '11:15 AM - 12:15 PM', subject: 'English', teacher: 'Mrs. Davis', room: '103' },
      { period: 5, time: '1:00 PM - 2:00 PM', subject: 'Art', teacher: 'Ms. Martinez', room: '106' },
      { period: 6, time: '2:00 PM - 3:00 PM', subject: 'Music', teacher: 'Mr. Anderson', room: '107' }
    ],
    Wednesday: [
      { period: 1, time: '8:00 AM - 9:00 AM', subject: 'English', teacher: 'Mrs. Davis', room: '103' },
      { period: 2, time: '9:00 AM - 10:00 AM', subject: 'Mathematics', teacher: 'Mr. Johnson', room: '101' },
      { period: 3, time: '10:15 AM - 11:15 AM', subject: 'Science', teacher: 'Ms. Smith', room: '102' },
      { period: 4, time: '11:15 AM - 12:15 PM', subject: 'Geography', teacher: 'Mr. Wilson', room: '104' },
      { period: 5, time: '1:00 PM - 2:00 PM', subject: 'Computer Science', teacher: 'Ms. Brown', room: '105' },
      { period: 6, time: '2:00 PM - 3:00 PM', subject: 'Library', teacher: 'Mrs. Garcia', room: 'Library' }
    ],
    Thursday: [
      { period: 1, time: '8:00 AM - 9:00 AM', subject: 'Mathematics', teacher: 'Mr. Johnson', room: '101' },
      { period: 2, time: '9:00 AM - 10:00 AM', subject: 'Science', teacher: 'Ms. Smith', room: '102' },
      { period: 3, time: '10:15 AM - 11:15 AM', subject: 'English', teacher: 'Mrs. Davis', room: '103' },
      { period: 4, time: '11:15 AM - 12:15 PM', subject: 'Social Studies', teacher: 'Mr. Wilson', room: '104' },
      { period: 5, time: '1:00 PM - 2:00 PM', subject: 'Physical Education', teacher: 'Mr. Taylor', room: 'Gym' },
      { period: 6, time: '2:00 PM - 3:00 PM', subject: 'Computer Science', teacher: 'Ms. Brown', room: '105' }
    ],
    Friday: [
      { period: 1, time: '8:00 AM - 9:00 AM', subject: 'Science', teacher: 'Ms. Smith', room: '102' },
      { period: 2, time: '9:00 AM - 10:00 AM', subject: 'Mathematics', teacher: 'Mr. Johnson', room: '101' },
      { period: 3, time: '10:15 AM - 11:15 AM', subject: 'English', teacher: 'Mrs. Davis', room: '103' },
      { period: 4, time: '11:15 AM - 12:15 PM', subject: 'Art', teacher: 'Ms. Martinez', room: '106' },
      { period: 5, time: '1:00 PM - 2:00 PM', subject: 'Music', teacher: 'Mr. Anderson', room: '107' },
      { period: 6, time: '2:00 PM - 3:00 PM', subject: 'Class Meeting', teacher: 'Mr. Johnson', room: '101' }
    ]
  };

  // Load schedule data
  useEffect(() => {
    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setSchedule(mockSchedule[selectedDay] || []);
      setLoading(false);
    }, 500);
  }, [selectedDay]);

  return (
    <div>
      <h1 className="mb-4">My Schedule</h1>

      <div className="card mb-4">
        <div className="card-body">
          <div className="row">
            <div className="col-md-4 mb-3">
              <label htmlFor="day" className="form-label">Select Day</label>
              <select
                className="form-select"
                id="day"
                value={selectedDay}
                onChange={(e) => setSelectedDay(e.target.value)}
              >
                <option value="Monday">Monday</option>
                <option value="Tuesday">Tuesday</option>
                <option value="Wednesday">Wednesday</option>
                <option value="Thursday">Thursday</option>
                <option value="Friday">Friday</option>
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
        <div className="card">
          <div className="card-header bg-primary text-white">
            <h4 className="mb-0">Schedule for {selectedDay}</h4>
          </div>
          <div className="card-body">
            {schedule.length === 0 ? (
              <div className="alert alert-info">
                No schedule found for this day.
              </div>
            ) : (
              <div className="table-responsive">
                <table className="table table-hover">
                  <thead>
                    <tr>
                      <th>Period</th>
                      <th>Time</th>
                      <th>Subject</th>
                      <th>Teacher</th>
                      <th>Room</th>
                    </tr>
                  </thead>
                  <tbody>
                    {schedule.map((period, index) => (
                      <tr key={index}>
                        <td>{period.period}</td>
                        <td>{period.time}</td>
                        <td>{period.subject}</td>
                        <td>{period.teacher}</td>
                        <td>{period.room}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      )}

      <div className="card mt-4">
        <div className="card-header bg-primary text-white">
          <h4 className="mb-0">Weekly Overview</h4>
        </div>
        <div className="card-body">
          <div className="row">
            {Object.keys(mockSchedule).map(day => (
              <div className="col-md-4 mb-4" key={day}>
                <div className={`card h-100 ${day === selectedDay ? 'border-primary' : ''}`}>
                  <div className={`card-header ${day === selectedDay ? 'bg-primary text-white' : ''}`}>
                    <h5 className="mb-0">{day}</h5>
                  </div>
                  <div className="card-body">
                    <ul className="list-group list-group-flush">
                      {mockSchedule[day].slice(0, 3).map((period, index) => (
                        <li className="list-group-item" key={index}>
                          <div className="d-flex justify-content-between">
                            <span>{period.time.split(' - ')[0]}</span>
                            <span>{period.subject}</span>
                          </div>
                        </li>
                      ))}
                      {mockSchedule[day].length > 3 && (
                        <li className="list-group-item text-center">
                          <button 
                            className="btn btn-sm btn-link"
                            onClick={() => setSelectedDay(day)}
                          >
                            View all
                          </button>
                        </li>
                      )}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewSchedule;
