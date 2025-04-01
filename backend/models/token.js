import mongoose from 'mongoose';

// local connection
mongoose.connect("mongodb://localhost:27017/carps");

const schema = new mongoose.Schema ({
    token: { type: String, required: true },
    expiresAt: { type: Date, required: true }
});

schema.index ( { expiresAt: 1 }, { expireAfterSeconds: 0 } );

const Token = mongoose.model("Token", schema);

export { Token };
