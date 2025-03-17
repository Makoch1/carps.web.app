import { CommentVote } from '../models/commentvote.js';
import { Comment } from '../models/comment.js';
import { PostVote } from '../models/postvote.js';
import { Post } from '../models/post.js';
import { User } from '../models/user.js';

/**
 *  REQ.BODY = {
 *      userID,
 *      postID,
 *      vote -> either [true] for upvote, or [false] for downvote
 *  }
 */
const votePost = async (req, res, next) => {
    const userID = req.body.userID;
    const postID = req.body.postID;
    const vote = req.body.vote; // vote type, true for upvote, false for upvote

    // find both user and post first, if they exist
    const user = await User.findById(userID).exec();
    const post = await Post.findById(postID).exec();

    if (!user || !post) {
        return res.status(404).json({ message: "User / Post not found" })
    }

    // check if there is a matching vote already
    const existingVote = await PostVote.exists({ user: user, post: post }).exec();

    // if there is, update the vote
    // if there isnt, create a new vote record
    if (existingVote) {
        await PostVote.updateOne(
            { user: user, post: post },
            { impression: vote }
        )
    } else {
        await PostVote.create({
            user: user,
            post: post,
            impression: vote
        });
    }

    return res.status(200).json({ message: "OK" });
}

/**
 *  REQ.BODY = {
 *      userID,
 *      commentID,
 *      vote -> either [true] for upvote, or [false] for downvote
 *  }
 */
const voteComment = async (req, res, next) => {
    const userID = req.body.userID;
    const commentID = req.body.commentID;
    const vote = req.body.vote; // vote type, true for upvote, false for upvote

    // find both user and comment first, if they exist
    const user = await User.findById(userID).exec();
    const comment = await Comment.findById(commentID).exec();

    if (!user || !comment) {
        return res.status(404).json({ message: "User / Comment not found" })
    }

    // check if there is a matching vote already
    const existingVote = await CommentVote.exists({ user: user, comment: comment }).exec();

    // if there is, update the vote
    // if there isnt, create a new vote record
    if (existingVote) {
        await CommentVote.updateOne(
            { user: user, comment: comment },
            { impression: vote }
        )
    } else {
        await CommentVote.create({
            user: user,
            comment: comment,
            impression: vote
        });
    }

    return res.status(200).json({ message: "OK" });
}

export { votePost, voteComment };
