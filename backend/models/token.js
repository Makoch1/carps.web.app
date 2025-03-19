import mongoose from 'mongoose';

// local connection
mongoose.connect("mongodb://localhost:27017/carps");

const schema = {
    token: { type: String, required: true },
};

const Token = mongoose.model("Token", schema);

export { Token };
