import express from 'express';

import { login, logout } from '../controllers/authenticationController.js'

const authenticationRouter = express.Router();

authenticationRouter.post('/login', login);
authenticationRouter.delete('/logout', logout);

export { authenticationRouter }
