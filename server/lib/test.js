const aws = require('aws-sdk');
const multer = require('multer');
const multerS3 = require('multer-s3');


// Set S3 endpoint to DigitalOcean Spaces
const spacesEndpoint = new aws.Endpoint('sfo2.digitaloceanspaces.com');
const s3 = new aws.S3({
    endpoint: spacesEndpoint,
    accessKeyId: process.env.SPACES_KEY,
    secretAccessKey: process.env.SPACES_SECRET
});

// Change bucket property to your Space name
const test = multer({
    storage: multerS3({
        s3: s3,
        bucket: 'rest-server-coffe',
        key: function (request, file, cb) {
            console.log("FILE:",file);
            cb(null, 'dir' + '/' +file.originalname);
        }
    })
}).array('upload', 1);


module.exports = test;

