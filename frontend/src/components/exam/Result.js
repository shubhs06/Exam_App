import React from 'react';
import {
  Box,
  Container,
  Paper,
  Typography,
  Button,
  Alert,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
} from '@mui/material';
import { CheckCircle, Cancel } from '@mui/icons-material';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { useExam } from '../../contexts/ExamContext';

const Result = () => {
  const { examId } = useParams();
  const navigate = useNavigate();
  const { token } = useAuth();
  const { exam, loading, error, fetchExam } = useExam();

  useEffect(() => {
    fetchExam(examId);
  }, [examId, fetchExam]);

  if (loading) {
    return (
      <Container component="main" maxWidth="md">
        <Box sx={{ display: 'flex', justifyContent: 'center', pt: 4 }}>
          Loading...
        </Box>
      </Container>
    );
  }

  if (error) {
    return (
      <Container component="main" maxWidth="md">
        <Alert severity="error" sx={{ mt: 4 }}>
          {error}
        </Alert>
      </Container>
    );
  }

  const calculatePercentage = () => {
    if (!exam.questions.length) return 0;
    const correctAnswers = exam.questions.filter(q => q.isCorrect).length;
    return ((correctAnswers / exam.questions.length) * 100).toFixed(2);
  };

  return (
    <Container component="main" maxWidth="md">
      <Paper elevation={3} sx={{ p: 4, mt: 4, mb: 4 }}>
        <Typography variant="h5" component="h1" gutterBottom>
          Exam Results
        </Typography>

        <Box sx={{ mb: 4 }}>
          <Typography variant="h6" gutterBottom>
            Your Score: {exam.score}/{exam.questions.length}
          </Typography>
          <Typography variant="subtitle1" color="text.secondary">
            Percentage: {calculatePercentage()}%
          </Typography>
        </Box>

        <Box sx={{ mb: 4 }}>
          <Typography variant="h6" gutterBottom>
            Detailed Results:
          </Typography>
          <List>
            {exam.questions.map((question, index) => (
              <ListItem
                key={question._id}
                sx={{
                  bgcolor: question.isCorrect ? 'success.light' : 'error.light',
                  mb: 1,
                }}
              >
                <ListItemText
                  primary={`Question ${index + 1}: ${question.question}`}
                  secondary={`Your Answer: ${question.selectedOption || 'Not answered'}`}
                />
                <ListItemSecondaryAction>
                  <IconButton
                    edge="end"
                    aria-label={question.isCorrect ? 'correct' : 'incorrect'}
                  >
                    {question.isCorrect ? <CheckCircle color="success" /> : <Cancel color="error" />}
                  </IconButton>
                </ListItemSecondaryAction>
              </ListItem>
            ))}
          </List>
        </Box>

        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
          <Button
            variant="contained"
            color="primary"
            onClick={() => navigate('/exams')}
          >
            Back to Exams
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default Result;
