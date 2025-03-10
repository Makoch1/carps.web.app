import { User } from '../models/user.js';

const getUser = /* async */ (req, res, next) => {
    const userID = req.params.id;

    res.send(`GET USER ${userID}`);
}

const editUser = /* async */ (req, res, next) => {
    const userID = req.params.id;

    res.send(`EDIT USER ${userID}`);
}

const createUser = /* async */ (req, res, next) => {
    if (!req.body.username || !req.body.password) {
        return res.status(400).json({ message: "Missing username / password" });
    }

    const newUser = new User({
        username: req.body.username,
        password: req.body.password, // hash this in th future
        description: req.body.description,
    })

    newUser.save()
        .then(() => res.status(200).send("User created"))
        .catch(err => {
            res.status(400).json({ message: "Cannot create user" })
        })
}

export { getUser, editUser, createUser };
