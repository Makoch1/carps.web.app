const mongoose = require("mongoose");

// local connection
mongoose.connect("mongodb://localhost:27017/carps");

const schema = {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    comment: { type: mongoose.Schema.Types.ObjectId, ref: "Comment", required: true },
    impression: { type: Boolean, required: true } // true for up, false for down
};

const CommentVote = mongoose.model("CommentVote", schema);

module.exports = CommentVote;