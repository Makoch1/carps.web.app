import mongoose from 'mongoose';
import { MONGODB_URI } from '../config.js';

import { CommentVote } from '../models/commentvote.js';

// local connection
mongoose.connect(MONGODB_URI);

const schema = new mongoose.Schema ({
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    parentPost: { type: mongoose.Schema.Types.ObjectId, ref: "Post", required: true },
    parentComment: { type: mongoose.Schema.Types.ObjectId, ref: "Comment" },
    comment: { type: String, required: true },
    timestamp: { type: Date, required: true }
});

schema.post('findOneAndDelete', async (doc) => {

    if (doc) {

        const comments = await Comment.find({ parentComment: doc._id });

        for (const comment of comments) {
            await Comment.findOneAndDelete({ _id: comment._id, parentComment: doc._id });
        }

        await CommentVote.deleteMany({ comment: doc._id });

    }

});

const Comment = mongoose.model("Comment", schema);

export { Comment };
