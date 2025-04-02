import mongoose from 'mongoose';
import { MONGODB_URI } from '../config.js';

// local connection
mongoose.connect(MONGODB_URI);

const schema = {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    post: { type: mongoose.Schema.Types.ObjectId, ref: "Post", required: true },
    impression: { type: Boolean, required: true } // true for up, false for down
};

const PostVote = mongoose.model("PostVote", schema);

export { PostVote };
