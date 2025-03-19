import { Post } from '../models/post.js';
import { Save } from '../models/save.js';
import { User } from '../models/user.js';
import { getVotes } from '../utils/getVotes.js';
import { getUserVote } from '../utils/getUserVote.js';
import { getProfilePictureUrl } from '../utils/getProfilePictureUrl.js';

// Get all posts
const getAllPosts = async (req, res, next) => {
    try {
        const posts = await Post.find()
            .sort({ timestamp: 'desc' })
            .populate('user', 'username description')
            .exec();

        if (!posts.length) {
            return res.status(404).json({ message: "No posts found" });
        }

        return res.status(200).json(posts);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Server error" });
    }
};

// Get a single post by ID
const getPost = async (req, res, next) => {
    const userID = '67cdbd2ec6a761b7da2dda26'; // TODO: once auth is done change this
    const postID = req.params.id;

    const post = await Post
        .findById(postID)
        .populate('user')
        .lean()
        .exec();

    if (!post) {
        return res.status(404).json({ message: "Post not found" });
    }

    // add upvotes
    post.upvotes = await getVotes('post', postID);
    post.userVote = await getUserVote('post', userID, postID);

    // check if user has saved this post
    const saved = await Save.findOne({ user: userID, post: postID })
    post.isSaved = saved !== null;

    // turn profile to actual profile pic link
    post.user.picture = getProfilePictureUrl(post.user.picture);

    return res.status(200).json(post);
};

const savePost = async (req, res, next) => {
    const userID = '67cdbd2ec6a761b7da2dda26'; // TODO: once auth is done change this
    const postID = req.body.postID;

    if (!userID || !postID) {
        res.status(400).json({ message: "missing data" });
    }

    // check if it is saved alr
    const saveExists = await Save.exists({ user: userID, post: postID }).exec();

    if (!saveExists) {
        const newSave = new Save({
            user: userID,
            post: postID
        });

        newSave.save()
            .then(() => res.status(200).json({ message: "Save successful" }))
            .catch(err => res.status(400).json({ message: "Cannot save post" }))
    } else {
        await Save.deleteOne({ user: userID, post: postID }).exec()

        res.status(200).json({ message: "Post unsaved" })
    }
}

// Delete a post by ID
const deletePost = async (req, res, next) => {
    try {
        const postID = req.params.id;

        const deletedPost = await Post.findByIdAndDelete(postID).exec();

        if (!deletedPost) {
            return res.status(404).json({ message: "Post not found" });
        }

        return res.status(200).json({ message: "Post deleted successfully" });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Server error" });
    }
};

export { getAllPosts, getPost, savePost, deletePost };
