import mongoose from 'mongoose';
import { MONGODB_URI } from '../config.js';

// local connection
mongoose.connect(MONGODB_URI);

const schema = {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    comment: { type: mongoose.Schema.Types.ObjectId, ref: "Comment", required: true },
    impression: { type: Boolean, required: true } // true for up, false for down
};

const CommentVote = mongoose.model("CommentVote", schema);

export { CommentVote };
