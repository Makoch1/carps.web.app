import express from 'express'
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { postsRouter } from './routers/postsRouter.js';
import { usersRouter } from './routers/usersRouter.js';
import { votesRouter } from './routers/votesRouter.js';
import { authenticationRouter } from './routers/authenticationRoute.js';

const PORT = 3000;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors());
app.use(cookieParser());

app.use(authenticationRouter);
app.use('/users', usersRouter);
app.use('/votes', votesRouter);
app.use('/posts', postsRouter);
app.use('/users', usersRouter);
app.use('/votes', votesRouter);


app.listen(PORT, (err) => {
    err ?
        console.log("Error: ", err) :
        console.log(`App is Listening on Port ${PORT}`);
});


