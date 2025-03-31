import mongoose from "mongoose";

// local connection
mongoose.connect("mongodb://localhost:27017/carps");

const schema = {
    username: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    isAdmin: { type: Boolean, required: true }, // true if admin, false if not
    picture: { type: String },
    description: { type: String }
};

const User = mongoose.model("User", schema);

export { User };
