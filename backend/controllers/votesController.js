import { CommentVote } from '../models/commentvote.js';
import { Comment } from '../models/comment.js';
import { PostVote } from '../models/postvote.js';
import { Post } from '../models/post.js';
import { User } from '../models/user.js';

/**
 *  REQ.BODY = {
 *      userID,
 *      postID,
 *      vote -> either [1] for upvote, or [-1] for downvote, or [0] for reset / remove
 *  }
 */
const votePost = async (req, res, next) => {
    const userID = req.body.auth;
    const postID = req.body.postID;
    const vote = req.body.vote; // vote type, true for upvote, false for upvote

    // find both user and post first, if they exist
    const user = await User.findById(userID).exec();
    const post = await Post.findById(postID).exec();

    if (!user || !post) {
        return res.status(404).json({ message: "User / Post not found" })
    }

    // check if there is a matching vote already
    const existingVote = await PostVote.exists({ user: userID, post: postID }).exec();

    // if there is, update the vote
    // if there isnt, create a new vote record
    if (existingVote) {
        if (vote === 0) {
            await PostVote.deleteOne({ user: userID, post: postID });
        } else {
            await PostVote.updateOne(
                { user: userID, post: postID },
                { impression: vote === 1 }
            )
        }
    } else {
        await PostVote.create({
            user: userID,
            post: postID,
            impression: vote === 1 // returns false if downvote
        });
    }

    return res.status(200).json({ message: "OK" });
}

/**
 *  REQ.BODY = {
 *      userID,
 *      commentID,
 *      vote -> either [1] for upvote, or [-1] for downvote, or [0] for remove
 *  }
 */
const voteComment = async (req, res, next) => {
    const userID = req.body.auth;
    const commentID = req.body.commentID;
    const vote = req.body.vote; // vote type, true for upvote, false for upvote

    // find both user and comment first, if they exist
    const user = await User.findById(userID).exec();
    const comment = await Comment.findById(commentID).exec();

    if (!user || !comment) {
        return res.status(404).json({ message: "User / Comment not found" })
    }

    // check if there is a matching vote already
    const existingVote = await CommentVote.exists({ user: userID, comment: commentID }).exec();

    // if there is, update the vote
    // if there isnt, create a new vote record
    if (existingVote) {
        if (vote === 0) {
            await CommentVote.deleteOne({ user: userID, comment: commentID });
        } else {
            await CommentVote.updateOne(
                { user: userID, comment: commentID },
                { impression: vote }
            )
        }
    } else {
        await CommentVote.create({
            user: userID,
            comment: commentID,
            impression: vote
        });
    }

    return res.status(200).json({ message: "OK" });
}

export { votePost, voteComment };
