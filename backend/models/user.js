import mongoose from "mongoose";
import { MONGODB_URI } from '../config.js';

// local connection
mongoose.connect(MONGODB_URI);

const schema = {
    username: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    isAdmin: { type: Boolean, required: true, default: false }, // true if admin, false if not
    picture: { type: String },
    description: { type: String }
};

const User = mongoose.model("User", schema);

export { User };
