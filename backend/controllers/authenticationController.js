import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import { User } from '../models/user.js';
import { Token } from '../models/token.js';
import { getProfilePictureUrl } from '../utils/getProfilePictureUrl.js';


// UTILITY:
// * Generates a new access token

const generateAccessToken = (ref) => {

    return jwt.sign(ref, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '30m' });

};


// MIDDLEWARE:
// * Checks the presence of a refresh token in cookies for authorization

const checkRefreshToken = (req, res, next) => {

    const refreshToken = req.cookies.refreshToken;

    if (!refreshToken) {

        res.sendStatus(401);

    }

    else {

        Token.exists({ token: refreshToken })

            .then((result) => {

                if (result) {
                    next();
                } else {
                    res.sendStatus(403);

                }

            })

            .catch((error) => {

                res.sendStatus(500);

            });

    }

};


// MIDDLEWARE:
// * Loads an access token for authorization
// * Creates a new access token for authorization

const reloadAccessToken = (req, res, next) => {

    let accessToken = req.cookies.accessToken;
    const refreshToken = req.cookies.refreshToken;

    if (!accessToken) {

        jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (error, data) => {

            if (error) {
                res.sendStatus(403);
            } else {
                accessToken = generateAccessToken({ auth: data.auth, admin: data.admin });
                res.cookie('accessToken', accessToken, { maxAge: 1000 * 60 * 30, httpOnly: true, secure: true, sameSite: 'Strict' });
            }

        });

    }

    jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET, (error, data) => {

        if (error) {
            res.sendStatus(403);
        } else {
            req.body.auth = data.auth;
            req.body.admin = data.admin;
            next();
        }

    });

}


// MIDDLEWARE:
// * Checks for authorization if applicable
// * Cannot result in an error due to authorization

const checkAuthorization = (req, res, next) => {

    let accessToken = req.cookies.accessToken;
    const refreshToken = req.cookies.refreshToken;

    if (refreshToken) {

        if (!accessToken) {

            jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (error, data) => {

                if (error) {
                    res.sendStatus(403);
                } else {
                    accessToken = generateAccessToken({ auth: data.auth, admin: data.admin });
                    res.cookie('accessToken', accessToken, { maxAge: 1000 * 60 * 30, httpOnly: true, secure: true, sameSite: 'Strict' });
                }

            });

        }

        jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET, (error, data) => {

            if (error) {
                res.sendStatus(403);
            } else {
                req.body.auth = data.auth;
                req.body.admin = data.admin;
                next();
            }

        });

    }

    else {

        next();

    }

}


// REQUEST HANDLER:
// * Authenticates the user
// * Creates tokens in the cookies and database for authorization

const login = async (req, res) => {

    User.findOne({ username: req.body.username })

        .then(async (user) => {

            if (user && bcrypt.compare(req.body.password, user.password)) {

                let duration;
            
                if (req.body.remember) {
                    duration = 1000 * 60 * 60 * 24 * 30; // 30 days
                } else { 
                    duration = 1000 * 60 * 60 * 24; // 1 day
                }

                const ref = { auth: user._id.toString(), admin: user.isAdmin };
                const accessToken = generateAccessToken(ref);
                const refreshToken = await Token.insertOne({ token: jwt.sign(ref, process.env.REFRESH_TOKEN_SECRET).toString(), expiresAt: new Date(Date.now() + duration) });

                res.cookie('accessToken', accessToken, { maxAge: 1000 * 60 * 30, httpOnly: true, secure: true, sameSite: 'Strict' });
                res.cookie('refreshToken', refreshToken.token, { maxAge: duration, httpOnly: true, secure: true, sameSite: 'Strict' });

                const context = {
                    uid: user._id.toString(),
                    username: user.username,
                    isAdmin: user.isAdmin,
                    picture: getProfilePictureUrl(user.picture)
                };

                res.status(200);
                res.json(context);

            }

            else {

                res.sendStatus(400);

            }

        })

        .catch((error) => {

            res.sendStatus(500);

        });

};


// REQUEST HANDLER: 
// * Clears all tokens in the cookies and database

const logout = async (req, res) => {

    await Token.deleteMany({ token: req.cookies.refreshToken });

    res.clearCookie('accessToken');
    res.clearCookie('refreshToken');

    res.sendStatus(200);

};


// REQUEST HANDLER:
// * Returns public user information to be stored in context (frontend)

const getContext = (req, res) => {

    User.findOne({ _id: req.body.auth })

        .then(async (user) => {

            const context = {
                uid: user._id.toString(),
                username: user.username,
                isAdmin: user.isAdmin,
                picture: getProfilePictureUrl(user.picture)
            };

            res.status(200);
            res.json(context);

        })

        .catch((error) => {

            res.sendStatus(500);

        });

};

export { checkRefreshToken, reloadAccessToken, checkAuthorization, login, logout, getContext };
