import express from 'express';

import { checkRefreshToken, reloadAccessToken, getContext, login, logout } from '../controllers/authenticationController.js'

const authenticationRouter = express.Router();

authenticationRouter.post('/login', login);
authenticationRouter.delete('/logout', logout);
authenticationRouter.get('/auth', checkRefreshToken, reloadAccessToken, getContext);

export { authenticationRouter }
