import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

// Components
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import ExamList from './components/exam/ExamList';
import Exam from './components/exam/Exam';
import Result from './components/exam/Result';
import PrivateRoute from './components/auth/PrivateRoute';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
  },
});

function App() {
  return (
    <AuthProvider>
      <ExamProvider>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Router>
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route
                path="/exams"
                element={
                  <PrivateRoute>
                    <ExamList />
                  </PrivateRoute>
                }
              />
              <Route
                path="/exam/:examId"
                element={
                  <PrivateRoute>
                    <Exam />
                  </PrivateRoute>
                }
              />
              <Route
                path="/result/:examId"
                element={
                  <PrivateRoute>
                    <Result />
                  </PrivateRoute>
                }
              />
            </Routes>
          </Router>
        </ThemeProvider>
      </ExamProvider>
    </AuthProvider>
  );
}

export default App;
