import mongoose from "mongoose";

const questionSchema = new mongoose.Schema({
    title: {
        type: String,
        default: ""
    },
    question: {
        type: String,
        required: true,
        default: ""
    },
    type: {
        type: String,
        enum: ["Multiple Choice", "True/False", "Fill in the Blank"],
        default: "Multiple Choice",
        required: true
    },
    points: {
        type: Number,
        default: 1,
        min: 0
    },
    quiz: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "QuizModel",
        required: true
    },
    
    choices: [{
        text: String,
        isCorrect: Boolean
    }],
    
    correctAnswer: {
        type: Boolean
    },
    
    possibleAnswers: [{
        type: String
    }]
}, {
    collection: "questions",
    timestamps: true
});

export default questionSchema;