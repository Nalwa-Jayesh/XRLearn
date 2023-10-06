const mongoose = require('mongoose');
const User = require('./userModel');
const Schema = mongoose.Schema;

const noteSchema = new Schema({
    title: {
        type: String,
        required: [true, "Please provide a title"],
    },
    content: {
        type: String,
        required: [true, "Please provide content"],
    },
    audioData: {
        type: String,
        required: false,
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
}, { timestamps: true });

const Note = mongoose.model("Note", noteSchema);
module.exports = Note;
