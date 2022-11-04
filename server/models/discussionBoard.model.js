const mongoose = require('mongoose');

const DiscussionBoardSchema = new mongoose.Schema({

    title: {
        type: String,
        required: true
    }
}, {timestamps: true});

const DiscussionBoard = mongoose.model("DiscussionBoard", DiscussionBoardSchema);
module.exports = DiscussionBoard;