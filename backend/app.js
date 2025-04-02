import express from 'express'
import cors from 'cors';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import { postsRouter } from './routers/postsRouter.js';
import { usersRouter } from './routers/usersRouter.js';
import { votesRouter } from './routers/votesRouter.js';
import { commentsRouter } from './routers/commentsRouter.js';
import { authenticationRouter } from './routers/authenticationRoute.js';

const FRONTEND_ORIGIN = 'http://localhost:5173';
const PORT = process.env.PORT || 3000;
const app = express();

app.use(bodyParser.json({ limit: '20mb' }));
app.use(bodyParser.urlencoded({ extended: true, limit: '20mb' }));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors({ origin: FRONTEND_ORIGIN, credentials: true }));
app.use(cookieParser());

app.use(authenticationRouter);
app.use('/comments', commentsRouter);
app.use('/posts', postsRouter);
app.use('/users', usersRouter);
app.use('/votes', votesRouter);


app.listen(PORT, (err) => {
    err ?
        console.log("Error: ", err) :
        console.log(`App is Listening on Port ${PORT}`);
});


