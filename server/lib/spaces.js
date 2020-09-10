const AWS = require('aws-sdk');


const spacesEndpoint = new AWS.Endpoint('sfo2.digitaloceanspaces.com');
const s3 = new AWS.S3({
    endpoint: spacesEndpoint,
    accessKeyId: process.env.SPACES_KEY,
    secretAccessKey: process.env.SPACES_SECRET
});

// Upload a File to a Space
function uploadFile(file, onSuccess, onError, to = "") {
    const params = {
        Bucket: "rest-server-coffe",
        Key: `${to}${file.name}`,
        Body: file.data,
        ContentType: file.mimetype,
        ContentLength: file.size,
        ContentEncoding: file.encoding,
        ACL: "private"
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
function getAllFiles() {
    const params = {
        Bucket: "rest-server-coffe",
    };

    s3.listObjects(params, function (err, data) {
        if (err) console.log(err, err.stack);
        else {
            data['Contents'].forEach(function (obj) {
                console.log(obj['Key']);
            })
        }
    });
}


module.exports = {
    uploadFile
};
