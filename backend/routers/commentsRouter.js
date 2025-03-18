import express from 'express';
import { getComment, createComment, updateComment, deleteComment } from '../controllers/commentsController.js'

const commentsRouter = express.Router();

// GET comment in corresponding post
commentsRouter.get('/:postID/comment', getComment);

// POST comment
commentsRouter.post('/:postID/comment', createComment);

// EDIT comment attributes with authorization
commentsRouter.put('/:postID/comment/:commentID', updateComment);

// DELETE comment with authorization
commentsRouter.delete('/:postID/comment/:commentID', deleteComment);

export { commentsRouter }