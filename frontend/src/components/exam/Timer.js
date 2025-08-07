import React, { useEffect, useState } from 'react';
import {
  Box,
  Typography,
  CircularProgress,
  Alert,
} from '@mui/material';

const Timer = ({ exam, onTimeUp }) => {
  const [timeLeft, setTimeLeft] = useState(
    Math.floor((new Date(exam.endTime) - new Date()) / 1000)
  );

  useEffect(() => {
    const interval = setInterval(() => {
      const currentTime = Math.floor((new Date(exam.endTime) - new Date()) / 1000);
      setTimeLeft(currentTime);

      if (currentTime <= 0) {
        clearInterval(interval);
        onTimeUp();
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [exam.endTime, onTimeUp]);

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
      <CircularProgress
        variant="determinate"
        value={(timeLeft / (30 * 60)) * 100}
        size={40}
        sx={{
          color: (theme) => theme.palette.primary.main,
          '& .MuiCircularProgress-circle': {
            strokeLinecap: 'round',
          },
        }}
      />
      <Typography variant="h6">
        Time Remaining: {minutes.toString().padStart(2, '0')}:{seconds.toString().padStart(2, '0')}
      </Typography>
    </Box>
  );
};

export default Timer;
