const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
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

        const token = jwt.sign(
            {
                user: usuarioDB
            },
            process.env.SECRET_KEY,
            {
                expiresIn: process.env.EXPIRES_IN
            });

        res.json({
            ok: true,
            message: "Ok",
            user: usuarioDB,
            token,
        })
    });
});

module.exports = app;
