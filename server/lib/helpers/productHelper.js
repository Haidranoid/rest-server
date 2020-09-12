const uniqid = require('uniqid');
const DigitalOcean = require('../../lib/functions/DigitalOcean');
const {DEFAULT_PRODUCT_IMAGE} = require('../../lib/constants/constants');
const Product = require('../../models/Product');

function updateImage(req, res) {
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

        if (product.img && product.img !== DEFAULT_PRODUCT_IMAGE) {

            const fileName = product.img.split('/').slice(-1).pop();

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
                                        removed: fileName
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
                })

        } else {
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

        }
    })
}

module.exports = {
    updateImage
};
