require('./config/config');
const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const fileUpload = require('express-fileupload');
const app = express();

// parse application/x-www-form-urlencoded
app.use(express.urlencoded({extended: false}));
// parse application/json
app.use(express.json());
// parse the files in form-data
app.use(fileUpload({}));
// enables dir public
app.use(express.static(path.resolve(__dirname, '../public')));

// index endpoint
app.get('/', (req, res) => {
    res.json({hello: 'Welcome to Coffee API'})
});

// global routes configuration
app.use(require('./routes/index'));

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
