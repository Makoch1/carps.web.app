import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import { User } from '../models/user.js';
import { Token } from '../models/token.js';


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
            }
            else {
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
            }
            else {
                accessToken = generateAccessToken({ auth: data.auth });
                res.cookie('accessToken', accessToken, { maxAge: 1000 * 60 * 30, httpOnly: true, secure: true, sameSite: 'Strict' });
            }

        });

    }

    jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET, (error, data) => {

        if (error) 
            res.sendStatus(403);
        else {
            req.body.auth = data.auth;
            next();
        }

    });

}


// REQUEST HANDLER:
// * Authenticates the user
// * Creates tokens in the cookies and database for authorization
// + TODO: No proper 'remember me' functionality

const login = async (req, res) => {
    
    User.findOne({ username: req.body.username })
    
    .then(async (user) => {
        
        if (user && bcrypt.compare(req.body.password, user.password)) {

            const ref = { auth: user._id.toString() };
            const accessToken = generateAccessToken(ref);
            const refreshToken = await Token.insertOne({ token: jwt.sign(ref, process.env.REFRESH_TOKEN_SECRET).toString() });

            res.cookie('accessToken', accessToken, { maxAge: 1000 * 60 * 30, httpOnly: true, secure: true, sameSite: 'Strict' });
            res.cookie('refreshToken', refreshToken.token, { maxAge: 1000 * 60 * 60 * 8, httpOnly: true, secure: true, sameSite: 'Strict' });            
            res.sendStatus(200);

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


export { checkRefreshToken, reloadAccessToken, login, logout };
