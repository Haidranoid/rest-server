const express = require('express');
const _ = require('lodash');
const {authenticateToken} = require('./../middlewares/authentication');
const Product = require('../models/Product');
const app = express();

app.get('/products', authenticateToken, (req, res) => {
    const from = req.query.from || 0;
    const limit = req.query.limit || 20;

    Product.find({available: true})
        .skip(from)
        .limit(limit)
        .populate('user', 'name email')
        .populate('category', 'description')
        .exec((error, products) => {

            if (error) {
                return res.status(500).json({
                    ok: false,
                    message: 'Something went wrong',
                    error,
                })
            }

            res.json({
                ok: true,
                message: 'Query executed successfully',
                response: products
            })
        })
});

app.get('/products/:id', authenticateToken, (req, res) => {
    const {id} = req.params;

    Product.findById(id)
        //the populate must be as the property declaration in the schema
        .populate('user', 'name email')
        .populate('category', 'description')
        .exec((error, product) => {

            if (error) {
                return res.status(500).json({
                    ok: false,
                    message: 'Something went wrong',
                    error,
                })
            }

            if (!product) {
                return res.status(400).json({
                    ok: false,
                    message: 'Something went wrong',
                    error,
                })
            }

            res.status(200).json({
                ok: true,
                message: 'Query executed successfully',
                response: product
            })
        })
});

app.post('/products', authenticateToken, (req, res) => {
    const body = _.pick(req.body, ["name", "price", "description", "category"]);
    body.user = req.user._id;

    const product = new Product(body);

    product.save((error, product) => {

        if (error) {
            return res.status(500).json({
                ok: false,
                message: 'Something went wrong in the server',
                error,
            })
        }

        res.status(201).json({
            ok: true,
            message: 'Product created successfully',
            response: product
        })
    })

});

app.put('/products/:id', authenticateToken, (req, res) => {
    const {id} = req.params;
    const body = _.pick(req.body, ["name", "price", "category", "available", "description"]);

    Product.findById(id, function (error, product) {

            if (error) {
                return res.status(500).json({
                    ok: false,
                    message: 'Something went wrong in the server',
                    error,
                })
            }

            if (!product) {
                return res.status(400).json({
                    ok: false,
                    message: 'Something went wrong',
                    error,
                })
            }
            // 2: Edit
            product.name = body.name;
            product.price = body.price;
            product.category = body.category;
            product.available = body.available;
            product.description = body.description;

            // 3: Save
            product.save(function (error, product) {

                if (error) {
                    return res.status(500).json({
                        ok: false,
                        message: 'Something went wrong in the server',
                        error,
                    })
                }

                res.status(201).json({
                    ok: true,
                    message: 'Product updated successfully',
                    response: product
                })
            });
        }
    );
});

app.delete('/products/:id', authenticateToken, (req, res) => {
    const {id} = req.params;

    Product.findById(id, function (error, product) {

            if (error) {
                return res.status(500).json({
                    ok: false,
                    message: 'Something went wrong in the server',
                    error,
                })
            }

            if (!product) {
                return res.status(400).json({
                    ok: false,
                    message: 'Something went wrong',
                    error,
                })
            }
            // 2: Edit
            product.available = false;

            // 3: Save
            product.save(function (error, product) {

                if (error) {
                    return res.status(500).json({
                        ok: false,
                        message: 'Something went wrong in the server',
                        error,
                    })
                }

                res.status(200).json({
                    ok: true,
                    message: 'Product deleted successfully',
                    response: product
                })
            });
        }
    );

});


module.exports = app;
