import mongoose from 'mongoose';

import { Post } from '../models/post.js';
import { Save } from '../models/save.js';
import { User } from '../models/user.js';
import { getVotes } from '../utils/getVotes.js';
import { getUserVote } from '../utils/getUserVote.js';
import { getProfilePictureUrl } from '../utils/getProfilePictureUrl.js';

const PAGE_SIZE = 15;

// Get all posts
const getAllPosts = async (req, res, next) => {
    const userID = '67cdbd2ec6a761b7da2dda26'// TODO: once auth is done, change this to get actual user id
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
        ...(tags && tags.length && { tags: { $in: tags } }) // normal way doesn't work when tags is empty
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
            { $limit: PAGE_SIZE },
            { $addFields: { upvotes: "$votes.total" } }
        ])

        await User.populate(posts, { path: "user" });
        for (const post of posts) {
            post.userVote = await getUserVote('post', userID, post._id);
        }

        if (!posts.length) {
            return res.status(404).json({ message: "No posts found" });
        }

        return await res.status(200).json(posts);
    } else { // if sorting by new
        const posts = await Post
            .find(filters)
            .sort({ timestamp: 'desc' })
            .populate('user')
            .skip(skip)
            .limit(PAGE_SIZE)
            .lean()
            .exec();

        if (!posts.length) {
            return res.status(404).json({ message: "No posts found" });
        }

        for (const post of posts) {
            post.upvotes = await getVotes('post', post._id);
            post.userVote = await getUserVote('post', userID, post._id);
        }

        return res.status(200).json(posts);
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
    const userID = req.body.auth;
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
        const userID = req.body.auth;
        const postID = req.params.id;

        // TODO: once admin is done, change this
        const deletedPost = await Post.findOneAndDelete({ _id: postID, user: userID });// ensure the author is the one deleting it

        if (!deletedPost) {
            return res.status(404).json({ message: "Post not found" });
        }

        return res.status(200).json({ message: "Post deleted successfully" });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Server error" });
    }
};


// REQUEST HANDLER:
// * Creates a post

const createPost = async (req, res) => {

    await Post.insertOne({
        user: new mongoose.Types.ObjectId(req.body.auth),
        start: req.body.start,
        destination: req.body.destination,
        tags: req.body.tags,
        isOneWay: req.body.type == 'one-way' ? true : false,
        description: req.body.description,
        timestamp: new Date().toLocaleString()
    })

    .then(() => {
        res.sendStatus(200);
    })

    .catch(() => {
        res.sendStatus(500);
    });

}


// REQUEST HANDLER:
// * Edits a post

const editPost = (req, res) => {

    Post.findById(req.params.id)
    
    .then ((post) => {

        if (post.user.toString() == req.body.auth) {

            post.start = req.body.start;
            post.destination = req.body.destination;
            post.tags = req.body.tags;
            post.isOneWay = req.body.type == 'one-way' ? true : false;
            post.description = req.body.description;

            post.save()

            .then((result) => {
                res.sendStatus(200);
            })

            .catch((error) => {
                res.sendStatus(500);
            });

        }

    })

    .catch((error) => {
        res.sendStatus(500);
    });

};


export { getAllPosts, getPost, savePost, deletePost, createPost, editPost };
