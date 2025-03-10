import mongoose from 'mongoose';

// local connection
mongoose.connect("mongodb://localhost:27017/carps");

const schema = {
    username: { type: String, unique: true, required: true },
    password: { type: String, required: true }
};

const Admin = mongoose.model("Admin", schema);

export { Admin };
