import mongoose from 'mongoose';
import { MONGODB_URI } from '../config.js';

// local connection
mongoose.connect(MONGODB_URI);

const schema = {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    start: { type: String, required: true },
    destination: { type: String, required: true },
    tags: { type: [String], enum: ["Angkas", "Bus", "Grab", "Jeepney", "Taxi", "Train", "Tricycle", "Van"] },
    isOneWay: { type: Boolean, required: true },
    description: { type: String },
    timestamp: { type: Date, required: true }
};

const Post = mongoose.model("Post", schema);

export { Post };
