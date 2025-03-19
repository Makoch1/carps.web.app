import { Comment } from '../models/comment.js';
import { User } from '../models/user.js';
import { Post } from '../models/post.js';
import { getVotes } from '../utils/getVotes.js';
import { getUserVote } from '../utils/getUserVote.js';
import { getProfilePictureUrl } from '../utils/getProfilePictureUrl.js';

//show comments corresponding post
const getComment = async (req, res, next) => {
    const userID = req.body.auth ? req.body.auth : '';
    // to show all comments to a corresponding post
    const postID = req.params.postID;

    // get post
    const post = await Post.findById(postID).exec();
    if (!post) {
        return res.status(404).json({ message: "Post not found" })
    }

    // get comments under post
    const comments = await Comment
        .find({ parentPost: postID, parentComment: null })
        .populate('user')
        .sort({ timestamp: 'desc' })
        .lean()
        .exec();

    for (const comment of comments) {
        const commentID = comment._id;

        // get the comments nested within TODO: this isnt techincally correct yet
        comment.children = await Comment
            .find({ parentComment: commentID })
            .populate('user')
            .lean()
            .exec();

        // comment votes
        comment.upvotes = await getVotes('comment', commentID);
        comment.userVote = await getUserVote('comment', userID, commentID);

        // clickable profile
        comment.user.picture = getProfilePictureUrl(comment.user.picture);
    }

    // return all comments under post
    return res.status(200).json(comments);
}

//create comment under parent
const createComment = async (req, res, next) => {

    const post = req.params.postID;
    const user = req.body.auth;

    if (!req.body.comment) {
        return res.status(400).json({ message: "Missing comment content" });
    }

    const newComment = new Comment({
        user: user,
        parentPost: post,
        comment: req.body.comment,
        timestamp: Date.now()
    });

    newComment.save()
        .then(() => res.status(200).send("Comment created"))
        .catch(err => {
            res.status(400).json({ message: "Cannot create comment" })
        })
}

//create comment under parent
const createReply = async (req, res, next) => {

    const post = req.params.postID;
    const user = req.body.auth;
    const comment = req.params.commentID;

    if (!req.body.comment) {
        return res.status(400).json({ message: "Missing comment content" });
    }

    const newComment = new Comment({
        user: user,
        parentPost: post,
        parentComment: comment,
        comment: req.body.comment,
        timestamp: Date.now()
    });

    newComment.save()
        .then(() => res.status(200).send("Comment created"))
        .catch(err => {
            res.status(400).json({ message: "Cannot create comment" })
        })
}

//update corresponding comment
const updateComment = async (req, res, next) => {

    const userID = req.body.auth;
    const commentID = req.params.commentID;
    const postID = req.params.postID;

    //find comment and post!
    const comment = await Comment.findOne({ _id: commentID, user: userID }).exec();
    const post = await Post.findById(postID).exec();

    if (!comment || !post) {
        return res.status(404).json({ message: "Post / Comment not found" })
    }

    if (!req.body.comment) {
        return res.status(400).json({ message: "Missing comment content" });
    }

    //missing authorization
    const updatedComment = await Comment
        .findOneAndUpdate(
            { _id: commentID },
            {
                comment: req.body.comment
            },
            {
                new: true,
            }
        )
        .exec();
    return res.status(200).json({ newComment: updatedComment });
}

const deleteComment = async (req, res, next) => {

    const userID = req.body.auth;
    const commentID = req.params.commentID;
    const postID = req.params.postID;

    //find comment and post!
    const comment = await Comment.findOne({ _id: commentID, user: userID }).exec();
    const post = await Post.findById(postID).exec();

    if (!comment || !post) {
        return res.status(404).json({ message: "Post / Comment not found" })
    }

    await Comment
        .findOneAndDelete(
            { _id: commentID }
        )
        .exec();

    return res.status(200).send("Comment deleted");

}

export { getComment, createComment, createReply, updateComment, deleteComment };
