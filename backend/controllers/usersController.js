import { Post } from '../models/post.js';
import { Save } from '../models/save.js';
import { User } from '../models/user.js';

const getUser = async (req, res, next) => {
    const userID = req.params.id;

    // get user
    const user = await User.findById(req.params.id).exec();
    if (!user) {
        return res.status(404).json({ message: "User not found" })
    }

    // get posts by user
    const posts = await Post
        .find({ user: userID })
        .sort({ timestamp: 'desc' })
        .exec();

    // get saved posts by user
    const saves = await Save.find({ user: userID }).exec();
    const savedPosts = await Post // subquery-like query
        .find({
            '_id': {
                $in: saves.map(save => save.post) // get an array of post ids
            }
        })
        .sort({ timestamp: 'desc' })
        .exec();

    return res.status(200).json({
        username: user.username,
        description: user.description,
        posts: posts,
        savedPosts: savedPosts,
    });
}

const editUser = async (req, res, next) => {
    const userID = req.body.id; // TODO: once we have auth, get the id from the auth instead

    if (!req.body.username || !req.body.description) {
        return res.status(400).json({ message: "Missing username / description" })
    }

    // get that specific user
    const user = await User
        .findOneAndUpdate(
            { _id: userID },
            { // updates
                username: req.body.username,
                description: req.body.description
            },
            {
                new: true,
                fields: 'username description'
            }
        )
        .exec();

    if (!user) {
        return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json({ newUser: user });
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
