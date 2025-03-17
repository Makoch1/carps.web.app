import cors from 'cors';
import express from 'express'
import { usersRouter } from './routers/usersRouter.js';
import { votesRouter } from './routers/votesRouter.js';

const PORT = 3000;
const app = express();
app.use(express.json());
app.use(cors());

app.listen(PORT, (err) => {
    err ?
        console.log("Error: ", err) :
        console.log(`App is listening on port ${PORT}`);
});

app.use('/users', usersRouter);
app.use('/votes', votesRouter);
