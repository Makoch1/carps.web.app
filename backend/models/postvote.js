const mongoose = require("mongoose");

// local connection
mongoose.connect("mongodb://localhost:27017/carps");

const schema = {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    post: { type: mongoose.Schema.Types.ObjectId, ref: "Post", required: true },
    impression: { type: Boolean, required: true } // true for up, false for down
};

const PostVote = mongoose.model("PostVote", schema);

module.exports = PostVote;