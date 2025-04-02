import mongoose from 'mongoose';

import { Comment } from '../models/comment.js';
import { PostVote } from '../models/postvote.js';
import { Save } from '../models/save.js';

// local connection
mongoose.connect("mongodb://localhost:27017/carps");

const schema = new mongoose.Schema ({
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    start: { type: String, required: true },
    destination: { type: String, required: true },
    tags: { type: [String], enum: ["Angkas", "Bus", "Grab", "Jeepney", "Taxi", "Train", "Tricycle", "Van"] },
    isOneWay: { type: Boolean, required: true },
    description: { type: String },
    timestamp: { type: Date, required: true }
});

schema.post('findOneAndDelete', async (doc) => {

    if (doc) {

        const comments = await Comment.find({ parentPost: doc._id });

        for (const comment of comments) {
            await Comment.findOneAndDelete({ _id: comment._id, parentPost: doc._id });
        }

        await PostVote.deleteMany({ post: doc._id });
        await Save.deleteMany({ post: doc._id });

    }

});

const Post = mongoose.model("Post", schema);

export { Post };
