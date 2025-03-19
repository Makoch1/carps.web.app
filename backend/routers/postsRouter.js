import express from 'express';
import { getAllPosts, getPost, savePost, deletePost, createPost, editPost } from '../controllers/postsController.js';
import { checkAuthorization, checkRefreshToken, reloadAccessToken } from '../controllers/authenticationController.js'

const postsRouter = express.Router();

postsRouter.get('/', checkAuthorization, getAllPosts);                                              // View all posts
postsRouter.get('/:id', checkAuthorization, getPost);                                               // View a specific post
postsRouter.post('/save', checkRefreshToken, reloadAccessToken, savePost);
postsRouter.delete('/:id', checkRefreshToken, reloadAccessToken, deletePost); // Delete a post
postsRouter.post('/', checkRefreshToken, reloadAccessToken, createPost);        // Creates a post
postsRouter.put('/:id', checkRefreshToken, reloadAccessToken, editPost);        // Edits a post

export { postsRouter };
