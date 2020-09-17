const express = require('express');
const verifyFile = require('../middlewares/verifyFile');
const app = express();

app.put('/api/uploads/:folder/:id', verifyFile, (req, res) => {
    const {folder} = req.params;

    switch (folder) {
        case 'users':
            const {file} = req.files;
            file.mv('uploads/filename.jpg', err => {

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