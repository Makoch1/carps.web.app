import { Post } from '../models/post.js';
import { User } from '../models/user.js';

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
    try {
        const postID = req.params.id;

        const post = await Post.findById(postID)
            .populate('user', 'username description')
            .exec();

        if (!post) {
            return res.status(404).json({ message: "Post not found" });
        }

        return res.status(200).json(post);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Server error" });
    }
};

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

export { getAllPosts, getPost, deletePost };
