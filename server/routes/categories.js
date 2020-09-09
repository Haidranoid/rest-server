const express = require('express');
const _ = require('lodash');
const {authenticateToken, authenticateAdminRole} = require('./../middlewares/authentication');
const Category = require('../models/Category');
const app = express();

app.get('/categories', (req, res) => {
    Category.find({})
        .sort('description')
        .populate('User', 'name email')
        .exec((err, categoryDB) => {
            if (err) {
                return res.status(500).json({
                    ok: false,
                    message: 'Something went wrong',
                    error: err,
                })
            }

            if (!categoryDB) {
                return res.status(400).json({
                    ok: false,
                    message: 'Something went wrong',
                    error: err,
                })
            }

            res.json({
                ok: true,
                message: 'ok',
                response: categoryDB,
            })
        })
});

app.get('/categories/:id', (req, res) => {
    const {id} = req.params;

    Category.find({_id: id})
        .populate('User', 'name email')
        .exec((err, categoryDB) => {
            if (err) {
                return res.status(500).json({
                    ok: false,
                    message: 'Something went wrong',
                    error: err,
                })
            }

            if (!categoryDB) {
                return res.status(400).json({
                    ok: false,
                    message: 'Something went wrong',
                    error: err,
                })
            }

            res.json({
                ok: true,
                message: 'ok',
                response: categoryDB,
            })
        })
});

app.post('/categories', authenticateToken, (req, res) => {
    const body = req.body;

    const category = new Category({
        description: body.description,
        user: req.user._id,
    });

    category.save((err, categoryDB) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                message: 'Something went wrong',
                error: err,
            })
        }

        if (!categoryDB) {
            return res.status(400).json({
                ok: false,
                message: 'Something went wrong',
                error: err,
            })
        }

        res.json({
            ok: true,
            message: 'created',
            response: categoryDB,
        })
    })

});

app.put('/categories/:id', authenticateToken, (req, res) => {
    const {id} = req.params;
    const body = _.pick(req.body, ["description"]);

    Category.findByIdAndUpdate(id, body, {
        new: true,
        runValidators: true,
        context: 'query',
    }, (err, categoryDB) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                message: 'Something went wrong',
                error: err,
            })
        }

        if (!categoryDB) {
            return res.status(400).json({
                ok: false,
                message: 'Something went wrong',
                error: err,
            })
        }

        res.json({
            ok: true,
            message: 'updated',
            response: categoryDB,
        })

    })
});

app.delete('/categories/:id', [authenticateToken, authenticateAdminRole], (req, res) => {
    const {id} = req.params;

    Category.findByIdAndRemove(id, (err, categoryDB) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                message: 'Something went wrong',
                error: err,
            })
        }

        if (!categoryDB) {
            return res.status(400).json({
                ok: false,
                message: 'Something went wrong',
                error: err,
            })
        }

        res.json({
            ok: true,
            message: "deleted",
            response: categoryDB
        });
    })
});

module.exports = app;
