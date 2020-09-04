const express = require('express');
const User = require('../models/user');
const app = express();



app.get('/users', (req, res) => {
    res.json({response: 'get all users'});
});

app.get('/users/:id', (req, res) => {
    const {id} = req.params;
    res.json({response: `get user: ${id}`});
});

app.post('/users', (req, res) => {
    const body = req.body;

    const user = new User({
        name: body.name,
        email: body.email,
        password: body.password,
        role: body.role,
    });

    user.save((err, usuarioDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                message: 'Something went wrong',
                error: err,
            })
        }

        res.json({
            ok: true,
            message: 'Done',
            response: usuarioDB,
        })
    });
});

app.put('/users/:id', (req, res) => {
    const {id} = req.params;

    res.json({
        response: `user modified: ${id}`,
    });
});

app.delete('/users/:id', (req, res) => {
    const {id} = req.params;

    res.json({
        response: `user deleted: ${id}`
    });
});

module.exports = app;
