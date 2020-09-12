const uniqid = require('uniqid');
const DigitalOcean = require('../../lib/functions/DigitalOcean');
const {DEFAULT_USER_IMAGE} = require('../../lib/constants/constants');
const User = require('../../models/User');

function updateImage(req, res) {
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

        if (user.img && user.img !== DEFAULT_USER_IMAGE) {

            const fileName = user.img.split('/').slice(-1).pop();

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
                                        removed: fileName
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
                })
        } else {
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
        }
    })
}

module.exports = {
    updateImage
};
