import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const ExamContext = createContext();

export const useExam = () => {
  const context = useContext(ExamContext);
  if (!context) {
    throw new Error('useExam must be used within an ExamProvider');
  }
  return context;
};

export const ExamProvider = ({ children }) => {
  const [exam, setExam] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchExam = async (examId) => {
    try {
      setLoading(true);
      const response = await axios.get(`/api/exam/${examId}`);
      setExam(response.data);
      setError('');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch exam');
    } finally {
      setLoading(false);
    }
  };

  const startExam = async () => {
    try {
      setLoading(true);
      const response = await axios.post('/api/exam/start');
      setExam(response.data);
      setError('');
      return response.data._id;
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to start exam');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const submitExam = async (examId, answers) => {
    try {
      setLoading(true);
      await axios.post(`/api/exam/${examId}/submit`, { answers });
      setError('');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to submit exam');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return (
    <ExamContext.Provider value={{ exam, loading, error, fetchExam, startExam, submitExam }}>
      {children}
    </ExamContext.Provider>
  );
};
