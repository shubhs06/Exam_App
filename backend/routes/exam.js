const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Question = require('../models/Question');
const Exam = require('../models/Exam');

// Start new exam
router.post('/start', auth, async (req, res) => {
    try {
        // Get random questions
        const questions = await Question.aggregate([
            { $sample: { size: 10 } }
        ]);

        // Create exam session
        const exam = new Exam({
            userId: req.user.userId,
            questions: questions.map(q => ({
                questionId: q._id,
                correctOption: q.options.find(opt => opt.isCorrect).option
            })),
            startTime: new Date(),
            endTime: new Date(Date.now() + 30 * 60 * 1000) // 30 minutes from now
        });

        await exam.save();
        res.status(201).json(exam);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Get current exam
router.get('/:examId', auth, async (req, res) => {
    try {
        const exam = await Exam.findById(req.params.examId)
            .populate('questions.questionId', 'question options');
        
        if (!exam) {
            return res.status(404).json({ message: 'Exam not found' });
        }

        res.json(exam);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Submit exam
router.post('/:examId/submit', auth, async (req, res) => {
    try {
        const { answers } = req.body;
        const exam = await Exam.findById(req.params.examId);
        
        if (!exam) {
            return res.status(404).json({ message: 'Exam not found' });
        }

        // Calculate score
        let score = 0;
        const updatedQuestions = exam.questions.map(q => {
            const answer = answers.find(a => a.questionId === q.questionId.toString());
            const isCorrect = answer?.selectedOption === q.correctOption;
            
            if (isCorrect) {
                score++;
            }

            return {
                ...q,
                selectedOption: answer?.selectedOption,
                isCorrect
            };
        });

        // Update exam
        exam.questions = updatedQuestions;
        exam.score = score;
        exam.status = 'completed';
        await exam.save();

        res.json({
            score,
            totalQuestions: exam.questions.length,
            correctAnswers: score
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Auto-submit exam when time is up
router.post('/:examId/auto-submit', auth, async (req, res) => {
    try {
        const exam = await Exam.findById(req.params.examId);
        
        if (!exam) {
            return res.status(404).json({ message: 'Exam not found' });
        }

        // If exam is still in progress, mark it as completed with zero score
        if (exam.status === 'in-progress') {
            exam.score = 0;
            exam.status = 'completed';
            await exam.save();
        }

        res.json({
            message: 'Exam auto-submitted due to time expiration',
            score: exam.score
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
