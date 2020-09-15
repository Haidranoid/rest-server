const express = require('express');
const DigitalOcean = require('../lib/functions/DigitalOcean');
const {authenticateToken, authenticateAdminRole} = require('../middlewares/authentication');
const userHelper = require('../lib/helpers/userHelper');
const productHelper = require('../lib/helpers/productHelper');
const verifyFile = require('../middlewares/verifyFile');
const app = express();

app.get('/api/files', [authenticateToken, authenticateAdminRole], (req, res) => {
    DigitalOcean.listFiles(data => {
        return res.status(200).json({
            ok: true,
            message: 'File uploaded successfully',
            data: data['Contents']
        });

    }, error => {
        return res.status(500).json({
            ok: false,
            message: 'Something went wrong',
            error,
        });
    })
});

//app.post('/api/files/:folder', [authenticateToken, authenticateAdminRole, verifyFile], (req, res) => {});

app.put('/api/files/:folder/:id', [authenticateToken, authenticateAdminRole, verifyFile], (req, res) => {
//app.post('/api/files/:folder/:id', [verifyFile], (req, res) => {
    const {folder} = req.params;

    switch (folder) {
        case 'users':
            userHelper.updateImage(req, res);
            break;

        case 'products':
            productHelper.updateImage(req, res);
            break;

        default:
            res.status(404).json({
                ok: false,
                message: 'Route is not valid',
            })
    }
});


//app.delete('/api/files/:folder/:id', [authenticateToken, authenticateAdminRole], (req, res) => {});

module.exports = app;
