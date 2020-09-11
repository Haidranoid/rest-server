const uniqid = require('uniqid');
const User = require('../../models/User');
const {DEFAULT_USER_IMAGE} = require('../constants/index');
const DigitalOcean = require('../../lib/functions/DigitalOcean');
const extensionValidator = require('../../lib/utils/extensionValidator');

function uploadImage(req, res) {
    const {folder, id} = req.params;
    const {image} = req.files;
    const extInfo = extensionValidator(image.name, ['png', 'jpg', 'gif', 'jpeg']);

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
        image.name = uniqid(`${id}-`, `.${extInfo.extension}`);


        // removes and uploads the user image to digital ocean spaces
        if (user.img !== DEFAULT_USER_IMAGE) {

            const urlSplitted = user.img.split('/');
            const imageName = urlSplitted[urlSplitted.length - 1];

            DigitalOcean.removeFile(folder, imageName, () => {
                    DigitalOcean.uploadFile(folder, image, data => {
                            // uploads the user image in the data base
                            user.img = `${process.env.SPACES_ENDPOINT}/${folder}/${image.name}`;
                            user.save((err1, user1) => {

                                if (err1) {
                                    return res.status(500).json({
                                        ok: false,
                                        message: 'Image user change error',
                                        error: err1
                                    })
                                }

                                res.status(201).json({
                                    ok: true,
                                    message: 'File uploaded successfully',
                                    response: {
                                        user: user1,
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
        } else {
            DigitalOcean.uploadFile(folder, image, data => {
                    // uploads the user image in the data base
                    user.img = `${process.env.SPACES_ENDPOINT}/${folder}/${image.name}`;
                    user.save((err1, user1) => {

                        if (err1) {
                            return res.status(500).json({
                                ok: false,
                                message: 'Image user change error',
                                error: err1
                            })
                        }

                        res.status(201).json({
                            ok: true,
                            message: 'File uploaded successfully',
                            response: {
                                user: user1,
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
        }
    });

}

module.exports = {
    uploadImage
};
