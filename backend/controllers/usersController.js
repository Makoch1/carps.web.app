import bcrypt from 'bcrypt';
import { Post } from '../models/post.js';
import { Save } from '../models/save.js';
import { User } from '../models/user.js';
import { getVotes } from '../utils/getVotes.js';
import { getUserVote } from '../utils/getUserVote.js';
import { getProfilePictureUrl } from '../utils/getProfilePictureUrl.js';
import { uploadProfilePicture } from '../utils/uploadProfilePicture.js';


// TODO: once upvotes vote system is done, when getting posts make sure to get the upvotes
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
        .lean()
        .exec()

    // attach this user to the posts and calculate upvotes
    posts.forEach(async (post) => {
        post.user = user;
        post.upvotes = await getVotes('post', post._id);
        post.userVote = await getUserVote('post', userID, post._id);
    });

    // get saved posts by user
    const saves = await Save.find({ user: userID }).exec();
    const savedPosts = await Post // subquery-like query
        .find({
            '_id': {
                $in: saves.map(save => save.post) // get an array of post ids
            }
        })
        .sort({ timestamp: 'desc' })
        .lean()
        .exec();

    // get the user details of the saved posts
    for (const post of savedPosts) {
        post.user = await User.findById(post.user).exec();
        post.upvotes = await getVotes('post', post._id);
        post.userVote = await getUserVote('post', userID, post._id);
    }

    return res.status(200).json({
        username: user.username,
        description: user.description,
        picture: getProfilePictureUrl(user.picture),
        raw: user.picture,
        posts: posts,
        savedPosts: savedPosts,
    });
}

const editUser = async (req, res, next) => {
    const userID = req.body.auth;
    const newDescription = req.body.description;
    const newPicture = req.body.picture;

    if (!newDescription && !newPicture) {
        return res.status(400).json({ message: "Missing edits" })
    }

    // Essentially: conditionally adding properties to obects
    const updates = {
        ...(newDescription && { description: newDescription }),
        ...(newPicture && {
            picture: await uploadProfilePicture(
                newPicture,
                (await User.findOne({ _id: userID }, 'picture').exec()).picture
            )
        }),
    }

    // update and get the specific user
    const user = await User
        .findOneAndUpdate(
            { _id: userID },
            updates,
            { new: true, fields: 'username description picture' }
        )
        .exec();

    // check if there was a matching user
    if (!user) {
        return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json({ newUser: user });
}

const createUser = async (req, res, next) => {
    if (!req.body.username || !req.body.password) {
        return res.status(400).json({ message: "Missing username / password" });
    }

    const newUser = new User({
        username: req.body.username,
        password: await bcrypt.hash(req.body.password, 10),
        picture: '',
        description: '', // when registering, only username and password is given by user
    })

    newUser.save()
        .then(() => res.status(200).send("User created"))
        .catch(err => {
            res.status(400).json({ message: "Cannot create user" })
        })
}

export { getUser, editUser, createUser };
