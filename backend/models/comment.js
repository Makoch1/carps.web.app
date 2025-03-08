const mongoose = require("mongoose");

// local connection
mongoose.connect("mongodb://localhost:27017/carps");

const schema = {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    parent: { type: mongoose.Schema.Types.ObjectId, ref: "Comment" },
    comment: { type: String, required: true },
    timestamp: { type: Date, required: true }
};

const Comment = mongoose.model("Comment", schema);

module.exports = Comment;