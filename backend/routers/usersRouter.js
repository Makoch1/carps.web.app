import express from 'express';
import { getUser, editUser, createUser } from '../controllers/usersController.js'

const usersRouter = express.Router();

// GET Viewing user profile
usersRouter.get('/:id', getUser);

// PUT Editing user profile
usersRouter.put('/:id', editUser);

// POST Registering a new user / account
usersRouter.post('/', createUser);

export { usersRouter }
