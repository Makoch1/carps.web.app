//stand in admin how to auth haha
import { Admin } from '../models/admin.js';
import { Comment } from '../models/comment.js';
import { User } from '../models/user.js';


//show comments corresponding post
const getComment = async (req, res, next) => {
   // to show all comments to a corresponding post
   const postID = req.params.id;

   // get post
    const post = await User.findById(postID).exec();
    if (!post) {
        return res.status(404).json({ message: "Post not found" })
    }

    // get comments under post
    const comments = await Comment
        .find({ user: postID })
        .sort({ timestamp: 'desc' })
        .exec();

    // return all comments under post
    return res.status(200).json(comments);

}

//create comment under parent
const createComment = async (req, res, next) => {

    const post = req.params.postID;
    const user = req.params.userID;

    if (!req.body.comment) {
        return res.status(400).json({ message: "Missing comment content" });
    }

    const newComment = new Comment({
        user: user.username,
        parent: post,
        comment: req.body.comment,
        //no need for timestamp update?
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
    const user = req.params.userID;

    if (!req.body.comment) {
        return res.status(400).json({ message: "Missing comment content" });
    }

    const newComment = new Comment({
        user: user.username,
        parent: post,
        comment: req.body.comment,
        //no need for timestamp update?
    });

    newComment.save()
        .then(() => res.status(200).send("Comment created"))
        .catch(err => {
            res.status(400).json({ message: "Cannot create comment" })
        })
 }

 //update corresponding comment
const updateComment = async (req, res, next) => {

    const commentID = req.body.id;
    const postID = req.params.postID;

    //find comment and post!
    const comment = await User.findById(commentID).exec();
    const post = await User.findById(postID).exec();

    if (!comment || !post) {
        return res.status(404).json({ message: "Post / Comment not found" })
    }

    if (!req.body.comment) {
    return res.status(400).json({ message: "Missing comment content" });
    }

    //missing authorization
    const updatedComment = await Comment
        .findOneAndUpdate(
            {_id: commentID},
            {
                comment: req.body.comment
            },
            {
                new: true,
                fields: 'comment content'
            }
        )
        .exec();
    
    return res.status(200).json({ newComment: updatedComment });
}

const deleteComment = async (req, res, next) => {

    const commentID = req.body.id;
    const postID = req.params.postID;

    //find comment and post!
    const comment = await User.findById(commentID).exec();
    const post = await User.findById(postID).exec();

    if (!comment || !post) {
        return res.status(404).json({ message: "Post / Comment not found" })
    }

    //missing authorization
    const updatedComment = await Comment
        .findOneAndDelete(
            {_id: commentID}
        )
        .exec();
    
    return res.status(200).send("Comment deleted");

}

export { getComment, createComment, createReply, updateComment, deleteComment };