import mongoose from 'mongoose';

// local connection
mongoose.connect("mongodb://localhost:27017/carps");

const schema = {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    parenPost: {type: mongoose.Schema.Types.ObjectId, ref: "Post", required: true },
    parentComment: { type: mongoose.Schema.Types.ObjectId, ref: "Comment" },
    comment: { type: String, required: true },
    timestamp: { type: Date, required: true }
};

const Comment = mongoose.model("Comment", schema);

export { Comment };
