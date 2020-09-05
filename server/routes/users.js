const express = require('express');
const bcrypt = require('bcrypt');
const _ = require('lodash');
const User = require('../models/user');
const app = express();


app.get('/users', (req, res) => {

    const from = Number(req.query.from) || 0;
    const limit = Number(req.query.limit) || 5;

    User.find({state: true}, 'name email role state google img')
        .skip(from)
        .limit(limit)
        .exec((err, users) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    message: 'Something went wrong',
                    error: err,
                })
            }

            User.count({state: true}, (err, documents) => {
                res.json({
                    ok: true,
                    message: 'Ok',
                    documents,
                    response: users,
                })
            })
        })
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
        password: bcrypt.hashSync(body.password, 10),
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

        // usuarioDB.password = null;

        res.json({
            ok: true,
            message: 'Ok',
            response: usuarioDB,
        })
    });
});

app.put('/users/:id', (req, res) => {
    const {id} = req.params;
    const body = _.pick(req.body, ["name", "email", "img", "role", "state"]);

    User.findByIdAndUpdate(id, body, {
        new: true,
        runValidators: true,
        context: 'query',
    }, (err, usuarioDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                message: 'Something went wrong',
                error: err,
            })
        }

        res.json({
            ok: true,
            message: "Ok",
            response: usuarioDB,
        });
    });


});

app.delete('/users/:id', (req, res) => {
    const {id} = req.params;

    // remove the register from the DB
    //User.findByIdAndRemove(id, (err, userRemoved) => {

    User.findByIdAndUpdate(id, {state: false}, {new: true}, (err, userRemoved) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                message: 'Something went wrong',
                error: err,
            })
        }

        if (!userRemoved) {
            return res.status(400).json({
                ok: false,
                message: 'The user was not found'
            })
        }

        res.json({
            ok: true,
            message: "Ok",
            response: userRemoved
        });

    });

});

module.exports = app;
