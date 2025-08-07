const mongoose = require('mongoose');

const examSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    questions: [{
        questionId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Question',
            required: true
        },
        selectedOption: String,
        correctOption: String,
        isCorrect: Boolean
    }],
    score: {
        type: Number,
        default: 0
    },
    startTime: {
        type: Date,
        required: true
    },
    endTime: {
        type: Date,
        required: true
    },
    status: {
        type: String,
        enum: ['in-progress', 'completed'],
        default: 'in-progress'
    }
}, {
    timestamps: true
});

const Exam = mongoose.model('Exam', examSchema);
module.exports = Exam;
