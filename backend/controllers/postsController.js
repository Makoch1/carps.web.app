import mongoose from 'mongoose';
import { Post } from '../models/post.js';
import { PostVote } from '../models/postvote.js';
import { User } from '../models/user.js';

const PAGE_SIZE = 15;

// Get all posts
const getAllPosts = async (req, res, next) => {
    const {
        start,
        destination,
        page,
        sort,
        tags
    } = req.query;

    const filters = {
        start: { $regex: start, $options: "i" },
        destination: { $regex: destination, $options: "i" },
        ...(tags.length && { tags: { $all: tags } }) // normal way doesn't work when tags is empty
    }
    const skip = (page - 1) * PAGE_SIZE;

    if (sort === 'popular') {
        // https://www.mongodb.com/docs/manual/reference/operator/aggregation/lookup/
        // https://stackoverflow.com/questions/68071886/mongo-aggregate-match-group-with-sum-return-0-if-no-matches
        const posts = await Post.aggregate([
            { $match: filters },
            {
                $lookup: {
                    from: "postvotes",
                    let: { postID: "$_id" },
                    pipeline: [
                        {
                            $group: {
                                _id: "$$postID",
                                total: {
                                    $sum: {
                                        $cond: {
                                            "if": { $eq: ["$post", "$$postID"] },
                                            "then": { $cond: ["$impression", 1, -1] },
                                            "else": 0,
                                        }
                                    }
                                }
                            }
                        },
                    ],
                    as: "votes"
                }
            },
            { $unwind: "$votes" },
            { $sort: { "votes.total": -1 } },
            { $skip: skip },
            { $limit: PAGE_SIZE }
        ])

        await User.populate(posts, { path: "user" });

        if (!posts.length) {
            return res.status(404).json({ message: "No posts found" });
        }

        return res.status(200).json(posts);
    } else { // if sorting by new
        const posts = await Post
            .find(filters)
            .sort({ timestamp: 'desc' })
            .populate('user')
            .skip(skip)
            .limit(PAGE_SIZE)
            .exec();

        if (!posts.length) {
            return res.status(404).json({ message: "No posts found" });
        }

        return res.status(200).json(posts);
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
