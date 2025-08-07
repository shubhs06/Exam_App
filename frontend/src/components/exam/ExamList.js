import React from 'react';
import {
  Box,
  Button,
  Container,
  Paper,
  Typography,
  Alert,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useExam } from '../../contexts/ExamContext';

const ExamList = () => {
  const navigate = useNavigate();
  const { startExam, error } = useExam();

  const handleStartExam = async () => {
    try {
      const examId = await startExam();
      navigate(`/exam/${examId}`);
    } catch (err) {
      console.error('Error starting exam:', err);
    }
  };

  return (
    <Container component="main" maxWidth="md">
      <Paper elevation={3} sx={{ p: 4, mt: 4, mb: 4 }}>
        <Typography variant="h5" component="h1" gutterBottom>
          Available Exams
        </Typography>
        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}
        <Box sx={{ mt: 4 }}>
          <Button
            variant="contained"
            fullWidth
            onClick={handleStartExam}
          >
            Start New Exam
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default ExamList;
