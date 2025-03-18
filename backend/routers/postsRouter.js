import express from 'express';
import { getAllPosts, getPost, deletePost } from '../controllers/postsController.js';

const postsRouter = express.Router();

postsRouter.get('/', getAllPosts);       // View all posts
postsRouter.get('/:id', getPost);       // View a specific post
postsRouter.delete('/:id', deletePost); // Delete a post

export { postsRouter };
