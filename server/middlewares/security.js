const extensionValidator = require('../lib/utils/extensionValidator');

function verifyFile(req, res, next) {
    // validating if the user did not send a image
    if (!req.files || !req.files.file) {
        return res.status(400).json({
            ok: false,
            message: 'You did not choose any file',
        })
    }
    // validating extension file
    const {file} = req.files;
    const extInfo = extensionValidator(file.name, ['png', 'jpg', 'gif', 'jpeg']);
    if (!extInfo.response) {
        return res.status(400).json({
            ok: false,
            message: `The extension [${extInfo.extension}] is not valid`
        })
    }
    req.extInfo = extInfo;
    next()
}

module.exports = {
    verifyFile,
};
