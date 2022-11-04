const mongoose = require('mongoose');

const CommentSchema = new mongoose.Schema({

    userId: {
        type: mongoose.Types.ObjectId,
        ref: "UserSchema",
        required: true
    },
    isReply: {
        type: Number,
        required: true
    },
    commentId: {
        type: mongoose.Types.ObjectId,
        ref: "CommentSchema"
    },
    likes: {
        type: [String]
    },
    comment: {
        type: String,
        required: true
    },
    discussionBoardId: {
        type: mongoose.Types.ObjectId,
        ref: "discussionBoardSchema"
    }
}, {timestamps: true});

const Comment = mongoose.model("Comment", CommentSchema);
module.exports = Comment;