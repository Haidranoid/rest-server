const AWS = require('aws-sdk');
const spacesEndpoint = new AWS.Endpoint(process.env.SPACES_SERVER);
const s3 = new AWS.S3({
    endpoint: spacesEndpoint,
    accessKeyId: process.env.SPACES_KEY,
    secretAccessKey: process.env.SPACES_SECRET
});

// Upload a File to a Space
function uploadFile(folder, file, onSuccess, onError) {
    const params = {
        Bucket: process.env.SPACES_NAME,
        Key: `${folder}/${file.name}`,
        Body: file.data,
        ContentType: file.mimetype,
        ContentLength: file.size,
        ContentEncoding: file.encoding,
        ACL: "private",
        //ACL: "public-read"
    };

    s3.putObject(params, function (err, data) {
        if (err) {
            onError(err)
        } else {
            onSuccess(data)
        }
    });
}

// List All Files in a Space
function listFiles(onSuccess, onError) {
    const params = {
        Bucket: process.env.SPACES_NAME,
    };

    s3.listObjects(params, function (err, data) {
        if (err) {
            onError(err)
        } else {
            onSuccess(data)
        }
    });
}

function removeFile(folder, fileName, onSuccess, onError) {
    const params = {
        Bucket: process.env.SPACES_NAME,
        Key: `${folder}/${fileName}`,
    };

    s3.deleteObject(params, function (err, data) {
        if (err) {
            onError(err)
        } else {
            onSuccess(data)
        }
    });
}


module.exports = {
    uploadFile,
    listFiles,
    removeFile
};
