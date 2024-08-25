const mongoose = require('mongoose');
const User = require('./user');

const blogSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    image: {
        type: String
    },
    author: {
        type: mongoose.Types.ObjectId,
        ref: User,
        required: true
    }
}, { timestamps: true });

module.exports = mongoose.model("Blog", blogSchema);
