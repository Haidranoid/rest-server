const uniqid = require('uniqid');
const User = require('../../models/User');
const DigitalOcean = require('../../lib/functions/DigitalOcean');
const extensionValidator = require('../../lib/utils/extensionValidator');

function updateImage(id, req, res) {
    const {file} = req.files;
    const extInfo = extensionValidator(file.name, ['png', 'jpg', 'gif', 'jpeg']);

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

        // removes and uploads the user file to digital ocean spaces
        const urlSplitted = user.img.split('/');
        const fileName = urlSplitted[urlSplitted.length - 1];

        DigitalOcean.removeFile('users', fileName, () => {
                DigitalOcean.uploadFile('users', file, data => {
                        // uploads the user file in the data base
                        user.img = `${process.env.SPACES_ENDPOINT}/users/${file.name}`;
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
    })
}

module.exports = {
    updateImage
};
