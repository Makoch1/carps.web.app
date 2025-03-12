import express from 'express';
import { votePost, voteComment } from '../controllers/votesController.js';

const votesRouter = express.Router();

votesRouter.post('/post', votePost);
votesRouter.post('/comment', voteComment);

export { votesRouter }
