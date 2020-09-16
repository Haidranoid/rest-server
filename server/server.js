require('./config/process/config');
const express = require('express');
const mongoose = require('mongoose');
const fileUpload = require('express-fileupload');
const cors = require('cors');
const path = require('path');
const app = express();
const publicPath = path.resolve(__dirname, '../public');

app.use(cors());
// disables the server who uses
app.disable('x-powered-by');
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

    app.listen(process.env.PORT, () => {
        console.log("Listening port => ", 3000);
    });
});
