const express = require('express');
const uniqid = require('uniqid');
const verifyFile = require('../middlewares/verifyFile');
const app = express();

app.put('/api/uploads/:folder/:id', verifyFile, (req, res) => {
    const {folder} = req.params;

    switch (folder) {
        case 'users':
            const {id} = req.params;
            const {file} = req.files;
            const extInfo = req.extInfo;

            User.findById(id, (errorFind, user) => {
                if (errorFind || !user) {
                    return res.status(404).json({
                        ok: false,
                        message: 'The user does not exits',
                        error: errorFind
                    })
                }

                file.name = uniqid(`${id}-`, `.${extInfo.extension}`);

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
                    })
                });
            });

            break;

        case 'products':
            break;

        default:
            res.status(404).json({
                ok: false,
                message: 'Route is not valid',
            })
    }
});


module.exports = app;