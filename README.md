# School Management System

A comprehensive school management system that caters to the needs of school administration, teachers, students, and parents.

## Features

- **User Management**: Different user roles (Admin, Teacher, Student, Parent) with role-based access control
- **Student Management**: Add, edit, and manage student records
- **Teacher Management**: Add, edit, and manage teacher records
- **Class Management**: Create and manage classes, sections, and subjects
- **Attendance Management**: Take and track student attendance
- **Exam Management**: Create and schedule exams
- **Result Management**: Record and view student results
- **Fee Management**: Manage student fees and payments

## Tech Stack

### Backend
- Node.js
- Express.js
- MongoDB
- JWT Authentication

### Frontend
- React
- Bootstrap
- Axios

## Project Structure

```
school-management-system/  
├── frontend/                # Web and mobile apps  
│   ├── web/                # React.js  
│   │   ├── src/  
│   │   │   ├── components/ # Reusable UI elements  
│   │   │   ├── pages/      # Role-specific dashboards  
│   │   │   └── services/   # API calls  
│   └── mobile/             # Flutter/React Native (future)  
├── backend/  
│   ├── api/                # REST API endpoints  
│   │   ├── student/        # Student-related routes  
│   │   ├── teacher/        # Teacher-related routes  
│   │   └── auth/           # Authentication routes  
│   ├── models/             # Database schemas  
│   ├── services/           # Business logic  
│   └── utils/              # Helpers  
├── database/  
│   ├── migrations/         # Database schema changes  
│   └── seeds/              # Test data  
├── docs/                   # API docs, user manuals  
├── tests/                  # Unit, integration, E2E tests  
└── DevOps/  
    ├── Dockerfiles/        # Containerization  
    ├── CI-CD/              # GitHub Actions/Jenkins pipelines  
    └── nginx/              # Reverse proxy config  
```

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- MongoDB (v4 or higher)
- npm or yarn

### Installation

1. Clone the repository
   ```
   git clone https://github.com/yourusername/school-management-system.git
   cd school-management-system
   ```

2. Install backend dependencies
   ```
   cd backend
   npm install
   ```

3. Install frontend dependencies
   ```
   cd ../frontend/web
   npm install
   ```

4. Set up environment variables
   - Create a `.env` file in the backend directory with the following variables:
     ```
     PORT=5000
     MONGO_URI=mongodb://localhost:27017/school-management
     JWT_SECRET=your_jwt_secret
     JWT_EXPIRE=30d
     ```

### Running the Application

1. Start the backend server
   ```
   cd backend
   npm run dev
   ```

2. Start the frontend development server
   ```
   cd frontend/web
   npm run dev
   ```

3. Access the application
   - Backend API: http://localhost:5000
   - Frontend: http://localhost:3000

## Default Users

The system comes with the following default users:

1. Admin
   - Email: admin@school.com
   - Password: admin123

2. Teacher
   - Email: teacher@school.com
   - Password: teacher123

3. Student
   - Email: student@school.com
   - Password: student123

4. Parent
   - Email: parent@school.com
   - Password: parent123

## License

This project is licensed under the MIT License - see the LICENSE file for details.
