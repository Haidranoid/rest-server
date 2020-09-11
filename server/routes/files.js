const express = require('express');

const {authenticateToken, authenticateAdminRole} = require('../middlewares/authentication');
const {verifyFile} = require('../middlewares/files');
const DigitalOcean = require('../lib/functions/DigitalOcean');
const userHelper = require('../lib/helpers/userHelper');
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

app.post('/files/:folder', [authenticateToken, verifyFile], (req, res) => {
    const {folder} = req.params;
    const id = req.user._id;

    switch (folder) {
        case 'users':
            break;

        case 'products':
            break;
    }
});

app.put('/files/users', [authenticateToken, verifyFile], (req, res) => {
    const id = req.user._id;

    userHelper.updateImage(id, req, res);
});

app.delete('/files/users/:id', [authenticateToken, authenticateAdminRole], (req, res) => {
    const {folder, id} = req.params;

    switch (folder) {
        case 'users':
            break;

        case 'products':
            break;
    }
});

module.exports = app;
