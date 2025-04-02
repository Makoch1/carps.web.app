import mongoose from 'mongoose';
import { MONGODB_URI } from '../config.js';

// local connection
mongoose.connect(MONGODB_URI);

const schema = {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    parentPost: { type: mongoose.Schema.Types.ObjectId, ref: "Post", required: true },
    parentComment: { type: mongoose.Schema.Types.ObjectId, ref: "Comment" },
    comment: { type: String, required: true },
    timestamp: { type: Date, required: true }
};

const Comment = mongoose.model("Comment", schema);

export { Comment };
