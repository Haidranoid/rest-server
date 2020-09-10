const express = require('express');
const {authenticateToken, authenticateAdminRole} = require('../middlewares/authentication');
const {uploadFile, listFiles} = require('../lib/functions/spaces');
const extensionValidator = require('../lib/utils/extensionValidator');
const app = express();


app.get('/files', [authenticateToken, authenticateAdminRole], (req, res) => {

    listFiles(data => {

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

app.post('/files', [authenticateToken, authenticateAdminRole], (req, res) => {

    if (!req.files) {
        return res.status(400).json({
            ok: false,
            message: 'You did not choose any file',
        })
    }

    const {file} = req.files;

    const extInfo = extensionValidator(file.name);

    if (!extInfo.response){
        return res.status(400).json({
            ok:false,
            message:`The extension [${extInfo.extension}] is not valid`
        })
    }

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
