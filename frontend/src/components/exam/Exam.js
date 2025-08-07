import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Paper,
  Typography,
  Button,
  CircularProgress,
  Alert,
} from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { useExam } from '../../contexts/ExamContext';
import Timer from './Timer';
import QuestionCard from './QuestionCard';

const Exam = () => {
  const { examId } = useParams();
  const navigate = useNavigate();
  const { token } = useAuth();
  const { exam, loading, error, fetchExam, submitExam } = useExam();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState({});

  useEffect(() => {
    fetchExam(examId);
  }, [examId, fetchExam]);

  if (loading) {
    return (
      <Container component="main" maxWidth="md">
        <Box sx={{ display: 'flex', justifyContent: 'center', pt: 4 }}>
          <CircularProgress />
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

  const handleAnswerChange = (questionId, selectedOption) => {
    setAnswers({
      ...answers,
      [questionId]: selectedOption
    });
  };

  const handleNext = () => {
    setCurrentQuestionIndex((prevIndex) => {
      const newIndex = prevIndex + 1;
      if (newIndex < exam.questions.length) {
        return newIndex;
      }
      return prevIndex;
    });
  };

  const handlePrevious = () => {
    setCurrentQuestionIndex((prevIndex) => {
      const newIndex = prevIndex - 1;
      if (newIndex >= 0) {
        return newIndex;
      }
      return prevIndex;
    });
  };

  const handleSubmit = async () => {
    try {
      await submitExam(examId, answers);
      navigate(`/result/${examId}`);
    } catch (err) {
      console.error('Error submitting exam:', err);
    }
  };

  const currentQuestion = exam.questions[currentQuestionIndex];
  const totalQuestions = exam.questions.length;

  return (
    <Container component="main" maxWidth="md">
      <Paper elevation={3} sx={{ p: 4, mt: 4, mb: 4 }}>
        <Box sx={{ mb: 4 }}>
          <Typography variant="h5" component="h1" gutterBottom>
            Exam in Progress
          </Typography>
          <Timer exam={exam} onTimeUp={() => handleSubmit()} />
        </Box>

        <QuestionCard
          question={currentQuestion}
          onAnswerChange={(option) => handleAnswerChange(currentQuestion._id, option)}
          selectedAnswer={answers[currentQuestion._id]}
        />

        <Box sx={{ mt: 4, display: 'flex', justifyContent: 'space-between' }}>
          <Button
            variant="outlined"
            onClick={handlePrevious}
            disabled={currentQuestionIndex === 0}
          >
            Previous
          </Button>
          <Box sx={{ display: 'flex', gap: 2 }}>
            <Button
              variant="contained"
              onClick={handleNext}
              disabled={currentQuestionIndex === totalQuestions - 1}
            >
              Next
            </Button>
            <Button
              variant="contained"
              color="primary"
              onClick={handleSubmit}
              disabled={currentQuestionIndex !== totalQuestions - 1}
            >
              Submit Exam
            </Button>
          </Box>
        </Box>
      </Paper>
    </Container>
  );
};

export default Exam;
