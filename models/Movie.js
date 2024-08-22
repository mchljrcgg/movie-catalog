const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Reference to the User model
        required: true
    },
    comment: {
        type: String,
        required: [true, 'Comment is required']
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

// Define the movie schema
const movieSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Title is required']
    },
    director: {
        type: String,
        required: [true, 'Director is required']
    },
    year: {
        type: Number,
        required: [true, 'Year is required']
    },
    description: {
        type: String,
        required: [true, 'Description is required']
    },
    genre: {
        type: String,
        required: [true, 'Genre is required']
    },
    comments: [commentSchema] // Embedding the commentSchema directly
});

module.exports = mongoose.model('Movie', movieSchema);
