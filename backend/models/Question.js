const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
    question: {
        type: String,
        required: true,
        trim: true
    },
    options: [{
        option: { type: String, required: true },
        isCorrect: { type: Boolean, required: true }
    }],
    difficulty: {
        type: String,
        enum: ['easy', 'medium', 'hard'],
        default: 'medium'
    },
    category: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});

const Question = mongoose.model('Question', questionSchema);
module.exports = Question;
