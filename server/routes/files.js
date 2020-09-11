const express = require('express');


const {authenticateToken, authenticateAdminRole} = require('../middlewares/authentication');
const DigitalOcean = require('../lib/functions/DigitalOcean');
const userHelper = require('../lib/helpers/userHelper');
const extensionValidator = require('../lib/utils/extensionValidator');
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

app.post('/files/:folder/:id', [authenticateToken, authenticateAdminRole], (req, res) => {
    const {folder, id} = req.params;

    // validating folders allowed
    const validFolders = ['products', 'users'];
    if (validFolders.indexOf(folder) < 0) {
        return res.status(404).json({
            ok: false,
            message: 'Route does not found',
        })
    }

    // validating if the user did not send a image
    if (!req.files || !req.files.image) {
        return res.status(400).json({
            ok: false,
            message: 'You did not choose any file',
        })
    }

    // validating extension file
    const {image} = req.files;
    const extInfo = extensionValidator(image.name, ['png', 'jpg', 'gif', 'jpeg']);
    if (!extInfo.response) {
        return res.status(400).json({
            ok: false,
            message: `The extension [${extInfo.extension}] is not valid`
        })
    }

    userHelper.uploadImage(req, res)
});

module.exports = app;
