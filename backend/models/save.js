import mongoose from 'mongoose';

// local connection
mongoose.connect("mongodb://localhost:27017/carps");

const schema = {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    post: { type: mongoose.Schema.Types.ObjectId, ref: "Post", required: true }
};

const Save = mongoose.model("Save", schema);

export { Save };
