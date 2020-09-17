const express = require('express');
const uniqid = require('uniqid');
const path = require('path');
const fs = require('fs');
const User = require('../models/User');
const Product = require('../models/Product');
const {verifyFile} = require('../middlewares/security');
const {authenticateToken} = require('../middlewares/authentication');
const {DEFAULT_USER_IMAGE, DEFAULT_PRODUCT_IMAGE} = require("../lib/constants/constants");
const app = express();

app.get('/api/uploads/:folder/:id', authenticateToken, (req, res) => {
    const {folder, id} = req.params;


    switch (folder) {
        case 'users':
            User.findById(id, (errorFind, user) => {
                if (errorFind || !user) {
                    return res.status(404).json({
                        ok: false,
                        message: 'The user does not exits',
                        error: errorFind
                    })
                }

                const pathImage = path.resolve(user.img);
                return res.status(200).sendFile(pathImage);

            });
            break;

        case 'products':
            Product.findById(id, (errorFind, product) => {
                if (errorFind || !product) {
                    return res.status(404).json({
                        ok: false,
                        message: 'The product does not exits',
                        error: errorFind
                    })
                }

                const pathImage = path.resolve(product.img);
                return res.status(200).sendFile(pathImage);

            });
            break;

        default:
            res.status(404).json({
                ok: false,
                message: 'Route is not valid',
            })

    }
});

app.put('/api/uploads/:folder/:id', verifyFile, (req, res) => {
    const {folder, id} = req.params;

    const {file} = req.files;
    const extInfo = req.extInfo;

    switch (folder) {
        case 'users':
            User.findById(id, (errorFind, user) => {
                if (errorFind || !user) {
                    return res.status(404).json({
                        ok: false,
                        message: 'The user does not exits',
                        error: errorFind
                    })
                }

                file.name = uniqid(`${id}-`, `.${extInfo.extension}`);

                if (user.img && user.img !== DEFAULT_USER_IMAGE) {
                    const pathImage = path.resolve(user.img);
                    const removed = user.img;

                    if (fs.existsSync(pathImage)) {
                        fs.unlinkSync(pathImage)
                    } else {
                        return res.status(404).json({
                            ok: false,
                            message: "This file does not exists in the server",
                            error: {
                                file: user.img,
                            },
                        })
                    }

                    user.img = `uploads/users/${file.name}`;
                    user.save((err, userDB) => {
                        if (err) {
                            return res.status(500).json({
                                ok: false,
                                message: "Something went wrong",
                                error: err,
                            })
                        }

                        file.mv(`uploads/users/${file.name}`, err => {
                            if (err) {
                                return res.status(500).json({
                                    ok: false,
                                    message: "Something went wrong",
                                    error: err,
                                })
                            }

                            return res.status(201).json({
                                ok: true,
                                message: "File uploaded!",
                                response: {
                                    user: userDB,
                                    removed,
                                }
                            })
                        })
                    })

                } else {
                    user.img = `uploads/users/${file.name}`;
                    user.save((err, userDB) => {
                        if (err) {
                            return res.status(500).json({
                                ok: false,
                                message: "Something went wrong",
                                error: err,
                            })
                        }

                        file.mv(`uploads/users/${file.name}`, err => {
                            if (err) {
                                return res.status(500).json({
                                    ok: false,
                                    message: "Something went wrong",
                                    error: err,
                                })
                            }

                            return res.status(201).json({
                                ok: true,
                                message: "File uploaded!",
                                response: {
                                    user: userDB,

                                }
                            })
                        })
                    })
                }
            });
            break;

        case 'products':
            Product.findById(id, (errorFind, product) => {
                if (errorFind || !product) {
                    return res.status(404).json({
                        ok: false,
                        message: 'The product does not exits',
                        error: errorFind
                    })
                }

                file.name = uniqid(`${id}-`, `.${extInfo.extension}`);

                if (product.img && product.img !== DEFAULT_PRODUCT_IMAGE) {
                    const pathImage = path.resolve(product.img);
                    const removed = product.img;

                    if (fs.existsSync(pathImage)) {
                        fs.unlinkSync(pathImage)
                    } else {
                        return res.status(404).json({
                            ok: false,
                            message: "This file does not exists in the server",
                            error: {
                                file: product.img,
                            },
                        })
                    }

                    product.img = `uploads/products/${file.name}`;
                    product.save((err, productDB) => {
                        if (err) {
                            return res.status(500).json({
                                ok: false,
                                message: "Something went wrong",
                                error: err,
                            })
                        }

                        file.mv(`uploads/products/${file.name}`, err => {
                            if (err) {
                                return res.status(500).json({
                                    ok: false,
                                    message: "Something went wrong",
                                    error: err,
                                })
                            }

                            return res.status(201).json({
                                ok: true,
                                message: "File uploaded!",
                                response: {
                                    product: productDB,
                                    removed,
                                }
                            })
                        })
                    })

                } else {
                    product.img = `uploads/products/${file.name}`;
                    product.save((err, productDB) => {
                        if (err) {
                            return res.status(500).json({
                                ok: false,
                                message: "Something went wrong",
                                error: err,
                            })
                        }

                        file.mv(`uploads/products/${file.name}`, err => {
                            if (err) {
                                return res.status(500).json({
                                    ok: false,
                                    message: "Something went wrong",
                                    error: err,
                                })
                            }

                            return res.status(201).json({
                                ok: true,
                                message: "File uploaded!",
                                response: {
                                    product: productDB,

                                }
                            })
                        })
                    })
                }
            });
            break;

        default:
            res.status(404).json({
                ok: false,
                message: 'Route is not valid',
            })
    }
});


module.exports = app;
