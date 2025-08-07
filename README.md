# Online Exam System

A full-stack online exam system built with React.js, Node.js/Express, and MongoDB.

## Features

- User registration and login with JWT authentication
- Start and take exams with randomized multiple-choice questions
- Navigation through questions (Next/Previous functionality)
- Countdown timer with auto-submit capability
- Submit exam functionality with score calculation
- Result display page

## Tech Stack

- Frontend: React.js with Material-UI
- Backend: Node.js with Express.js
- Database: MongoDB
- Authentication: JWT

## Prerequisites

- Node.js (v14 or higher)
- MongoDB
- npm or yarn

## Installation

1. Clone the repository:
```bash
git clone [repository-url]
```

2. Install backend dependencies:
```bash
cd backend
npm install
```

3. Install frontend dependencies:
```bash
cd ../frontend
npm install
```

4. Create a .env file in the backend directory:
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/exam-app
JWT_SECRET=your-secret-key
```

## Running the Application

1. Start the backend server:
```bash
cd backend
npm start
```

2. Start the frontend development server:
```bash
cd frontend
npm start
```

The application will be available at http://localhost:3000

## API Documentation

### Authentication

#### Register
```
POST /api/auth/register
{
  "username": "string",
  "email": "string",
  "password": "string"
}
```

#### Login
```
POST /api/auth/login
{
  "email": "string",
  "password": "string"
}
```

### Exam

#### Start New Exam
```
POST /api/exam/start
Headers: Authorization: Bearer <token>
```

#### Get Exam Details
```
GET /api/exam/:examId
Headers: Authorization: Bearer <token>
```

#### Submit Exam
```
POST /api/exam/:examId/submit
Headers: Authorization: Bearer <token>
{
  "answers": {
    "questionId": "selectedOption"
  }
}
```

## Project Structure

```
exam-app/
├── backend/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   └── server.js
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── contexts/
│   │   └── App.js
└── README.md
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.
