require('./config/process/config');
const express = require('express');
const helmet = require('helmet');
const mongoose = require('mongoose');
const cors = require('cors');
const fileUpload = require('express-fileupload');
const rateLimit = require("express-rate-limit");
const path = require('path');
const app = express();
const publicPath = path.resolve(__dirname, '../public');

// apply some security steps
app.use(helmet());
// avoid DDos attack
const limiter = rateLimit({
    windowMs: 20 * 60 * 1000, // 20 minutes
    max: 200, // limit each IP to 100 requests per windowMs
    message: {
        ok: false,
        message: "Too many request from this IP, please try again later"
    },
    headers: false,
});
app.use(limiter);
// enables cors
app.use(cors({
    origin: 'http://localhost:2210'
}));
// parse application/x-www-form-urlencoded
app.use(express.urlencoded({extended: false}));
// parse application/json
app.use(express.json());
// parse the files in form-data
app.use(fileUpload({}));
// enables dir public
app.use(express.static(path.resolve(__dirname, '../public')));

// global routes configuration
app.use(require('./routes/index'));

// Handles any requests that don't match the ones above
app.get('*', (req, res) => {
    return res.sendFile(path.join(publicPath, 'index.html'), err => {
        if (err) {
            res.status(500).send(err)
        }
    });
});

//mongoose.set('runValidators', true);
mongoose.connect(process.env.CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
}, (err) => {
    if (err) throw err;

    // run the server in the port 3000
    app.listen(process.env.PORT, () => {
        console.log("Listening port => ", 3000);
    });
});
