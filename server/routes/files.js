const express = require('express');

const {authenticateToken, authenticateAdminRole} = require('../middlewares/authentication');
const verifyFile = require('../middlewares/verifyFile');
const DigitalOcean = require('../lib/functions/DigitalOcean');
const uniqid = require('uniqid');
const Product = require('../models/Product');
const User = require('../models/User');
const app = express();

app.get('/files', [authenticateToken, authenticateAdminRole], (req, res) => {
    DigitalOcean.listFiles(data => {
        res.status(200).json({
            ok: true,
            message: 'File uploaded successfully',
            data: data['Contents']
        });

    }, error => {
        res.status(500).json({
            ok: false,
            message: 'Something went wrong',
            error,
        });
    })
});

app.post('/files/users', [authenticateToken, verifyFile], (req, res) => {

});

app.put('/files/users/:id', [authenticateToken, authenticateAdminRole, verifyFile], (req, res) => {
    const {id} = req.params;
    const {file} = req.files;
    const extInfo = req.extInfo;

    // validating if the user exists
    User.findById(id, (errorFind, user) => {
        if (errorFind || !user) {
            return res.status(404).json({
                ok: false,
                message: 'The user does not exits',
                error: errorFind
            })
        }
        // changing name of the file avoiding the browser's cache
        file.name = uniqid(`${id}-`, `.${extInfo.extension}`);

        const urlSplitted = user.img.split('/');
        const fileName = urlSplitted[urlSplitted.length - 1];

        //TODO - AVOID THE ERASE OF THE DEFAULT IMAGE
        // removes and uploads the user file to digital ocean spaces
        DigitalOcean.removeFile('users', fileName, () => {
                DigitalOcean.uploadFile('users', file, data => {
                        // uploads the user file in the data base
                        user.img = `${process.env.SPACES_ENDPOINT}/users/${file.name}`;
                        user.save((errorDB, user) => {

                            if (errorDB) {
                                return res.status(500).json({
                                    ok: false,
                                    message: 'Image user change error',
                                    error: errorDB
                                })
                            }

                            res.status(201).json({
                                ok: true,
                                message: 'File updated successfully',
                                response: {
                                    user,
                                    data,
                                },
                            });
                        })

                    },
                    errorUpload => {
                        res.status(500).json({
                            ok: false,
                            message: 'Image user upload error',
                            error: errorUpload,
                        });
                    })
            },
            errorRemove => {
                res.status(500).json({
                    ok: false,
                    message: 'Image user upload error',
                    error: errorRemove,
                });
            });
    })
});

app.put('/files/products/:id', [authenticateToken, authenticateAdminRole, verifyFile], (req, res) => {
    const {id} = req.params;
    const {file} = req.files;
    const extInfo = req.extInfo;

    // validating if the product exists
    Product.findById(id, (errorFind, product) => {
        if (errorFind || !product) {
            return res.status(404).json({
                ok: false,
                message: 'The product does not exits',
                error: errorFind
            })
        }
        // changing name of the file avoiding the browser's cache
        file.name = uniqid(`${id}-`, `.${extInfo.extension}`);

        const urlSplitted = product.img.split('/');
        const fileName = urlSplitted[urlSplitted.length - 1];

        //TODO - AVOID THE ERASE OF THE DEFAULT IMAGE
        // removes and uploads the product file to digital ocean spaces
        DigitalOcean.removeFile('products', fileName, () => {
                DigitalOcean.uploadFile('products', file, data => {
                        // uploads the product file in the data base
                        product.img = `${process.env.SPACES_ENDPOINT}/products/${file.name}`;
                        product.save((errorDB, product) => {

                            if (errorDB) {
                                return res.status(500).json({
                                    ok: false,
                                    message: 'Image product change error',
                                    error: errorDB
                                })
                            }

                            res.status(201).json({
                                ok: true,
                                message: 'File updated successfully',
                                response: {
                                    product,
                                    data,
                                },
                            });
                        })

                    },
                    errorUpload => {
                        res.status(500).json({
                            ok: false,
                            message: 'Image product upload error',
                            error: errorUpload,
                        });
                    })
            },
            errorRemove => {
                res.status(500).json({
                    ok: false,
                    message: 'Image product upload error',
                    error: errorRemove,
                });
            });
    })
});


app.delete('/files/users/:id', [authenticateToken, authenticateAdminRole], (req, res) => {

});

module.exports = app;
