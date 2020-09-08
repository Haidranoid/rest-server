const express = require('express');
const _ = require('lodash');
const {authenticateToken, authenticateAdminRole} = require('./../middlewares/authentication');
const Category = require('../models/Category');
const app = express();

app.get('/categories', authenticateToken, (req, res) => {

});

app.get('/categories/:id', authenticateToken, (req, res) => {
    const {id} = req.params;
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
            message: 'Ok',
            category: categoryDB,
        })
    })

});

app.put('/categories/:id', authenticateToken, (req, res) => {
    const {id} = req.params;
    const body = _.pick(req.body, ["description"]);

    // fix the bug when the body is empty
    if (body === {}) {
        return res.status(400).json({
            ok: false,
            message: 'There is any data',
        })
    }

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
            message: 'Ok',
            category: categoryDB,
        })

    })
});

app.delete('/categories/:id', [authenticateToken, authenticateAdminRole], (req, res) => {
    const {id} = req.params;
});

module.exports = app;
