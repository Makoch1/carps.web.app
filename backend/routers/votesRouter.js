import express from 'express';
import { votePost, voteComment } from '../controllers/votesController.js';
import { checkRefreshToken, reloadAccessToken } from '../controllers/authenticationController.js';

const votesRouter = express.Router();

votesRouter.post('/post', checkRefreshToken, reloadAccessToken, votePost);
votesRouter.post('/comment', checkRefreshToken, reloadAccessToken, voteComment);

export { votesRouter }
