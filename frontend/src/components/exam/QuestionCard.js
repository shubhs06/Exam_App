import React from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  FormControl,
  RadioGroup,
  FormControlLabel,
  Radio,
  FormLabel,
  Button,
} from '@mui/material';

const QuestionCard = ({ question, onAnswerChange, selectedAnswer }) => {
  const { question: questionText, options } = question;

  const handleRadioChange = (event) => {
    onAnswerChange(event.target.value);
  };

  return (
    <Card sx={{ mb: 4 }}>
      <CardContent>
        <Typography variant="h6" component="h2" gutterBottom>
          {questionText}
        </Typography>
        <FormControl component="fieldset">
          <FormLabel component="legend">Select your answer:</FormLabel>
          <RadioGroup
            aria-label="options"
            name="options"
            value={selectedAnswer}
            onChange={handleRadioChange}
          >
            {options.map((option, index) => (
              <FormControlLabel
                key={index}
                value={option.option}
                control={<Radio />}
                label={option.option}
              />
            ))}
          </RadioGroup>
        </FormControl>
      </CardContent>
    </Card>
  );
};

export default QuestionCard;
