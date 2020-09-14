const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const {OAuth2Client} = require('google-auth-library');

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
const app = express();

app.post('/login', (req, res) => {

    const {body} = req;

    User.findOne({email: body.email}, (err, usuarioDB) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                message: 'Something went wrong',
                error: err,
            })
        }

        if (!usuarioDB) {
            return res.status(400).json({
                ok: false,
                message: 'The (user) or password is incorrect'
            })
        }

        if (!bcrypt.compareSync(body.password, usuarioDB.password)) {
            return res.status(400).json({
                ok: false,
                message: 'The user or (password) is incorrect'
            })
        }

        const token = jwt.sign({user: usuarioDB}, process.env.SECRET_KEY, {
                expiresIn: process.env.EXPIRES_IN
            });

        return res.status(200).json({
            ok: true,
            message: "Ok",
            user: usuarioDB,
            token,
        })
    });
});

// Google config
async function verify(token) {
    const ticket = await client.verifyIdToken({
        idToken: token,
        audience: process.env.GOOGLE_CLIENT_ID,
    });
    const payload = ticket.getPayload();

    return {
        name: payload.name,
        email: payload.email,
        img: payload.picture,
        google: true,
    }
}

app.post('/login/google', async (req, res) => {
    const token = req.body.id_token;

    const googleUser = await verify(token).catch(err => {
        return res.status(403).json({
            ok: false,
            error: err,
        })
    });

    User.findOne({email: googleUser.email}, (err, usuarioDB) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                message: 'Something went wrong',
                error: err,
            })
        }

        if (usuarioDB) {
            if (usuarioDB.google === false) {

                return res.status(400).json({
                    ok: false,
                    message: 'You must login with your normal account'
                })

            } else {

                const token = jwt.sign({user: usuarioDB}, process.env.SECRET_KEY,
                    {
                        expiresIn: process.env.EXPIRES_IN
                    });

                return res.json({
                    ok: true,
                    message: "Ok",
                    user: usuarioDB,
                    token,
                })
            }

        } else {
            // if the user doesn't exist in the data base
            const user = new User();
            user.name = googleUser.name;
            user.email = googleUser.email;
            user.img = googleUser.img;
            user.google = true;
            // this password must be encrypted
            // bcrypt.hashSync(body.password, 10)
            user.password = ':)';

            user.save((err, usuarioDB) => {
                if (err) {
                    return res.status(500).json({
                        ok: false,
                        message: 'Something went wrong',
                        error: err,
                    })
                }

                const token = jwt.sign(
                    {
                        user: usuarioDB
                    },
                    process.env.SECRET_KEY,
                    {
                        expiresIn: process.env.EXPIRES_IN
                    });

                return res.json({
                    ok: true,
                    message: "Ok",
                    user: usuarioDB,
                    token,
                })

            })
        }
    });
});


module.exports = app;
