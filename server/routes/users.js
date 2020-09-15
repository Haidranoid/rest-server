const express = require('express');
const bcrypt = require('bcrypt');
const _ = require('lodash');
const User = require('../models/User');
const {authenticateToken, authenticateAdminRole} = require('../middlewares/authentication');
const app = express();


app.get('/api/users', authenticateToken, (req, res) => {

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
                return res.json({
                    ok: true,
                    message: 'Ok',
                    documents,
                    response: users,
                })
            })
        })
});

app.get('/api/users/:id', authenticateToken, (req, res) => {
    const {id} = req.params;
    return res.json({response: `get user: ${id}`});
});

app.post('/api/users', [authenticateToken, authenticateAdminRole], (req, res) => {
    const body = req.body;

    const user = new User({
        name: body.name,
        email: body.email,
        password: bcrypt.hashSync(body.password, 10),
        role: body.role,
    });

    user.save((err, usuarioDB) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                message: 'Something went wrong',
                error: err,
            })
        }

        // usuarioDB.password = null;

        return res.json({
            ok: true,
            message: 'Ok',
            response: usuarioDB,
        })
    });
});

app.put('/api/users/:id', [authenticateToken, authenticateAdminRole], (req, res) => {
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

        return res.json({
            ok: true,
            message: "Ok",
            response: usuarioDB,
        });
    });


});

app.delete('/api/users/:id', [authenticateToken, authenticateAdminRole], (req, res) => {
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

        return res.json({
            ok: true,
            message: "Ok",
            response: userRemoved
        });

    });

});

module.exports = app;
