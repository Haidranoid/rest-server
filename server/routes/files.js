const express = require('express');
const {authenticateToken} = require('../middlewares/authentication');
const {uploadFile} = require('../lib/spaces');
const app = express();


app.get('/files', (req, res) => {

});

app.post('/files', authenticateToken, (req, res) => {

    if (!req.files) {
        return res.status(400).json({
            ok: false,
            message: 'You did not choose any file',
        })
    }

    const {file} = req.files;

    uploadFile(file,
        data => {

            res.status(201).json({
                ok: true,
                message: 'File uploaded successfully',
                response: {
                    fileName: file.name,
                    data,
                },
            })

        },
        error => {

            res.status(500).json({
                ok: false,
                message: 'Something went wrong',
                error,
            });

        });
});

module.exports = app;
