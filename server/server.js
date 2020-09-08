require('./config/config');
const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const bodyParser = require('body-parser');
const app = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: false}));
// parse application/json
app.use(bodyParser.json());

// enables dir public
app.use(express.static(path.resolve(__dirname, '../public')));

// index endpoint
app.get('/', (req, res) => {
    res.json({hello: 'Welcome to Coffee API'})
});

// global routes configuration
app.use(require('./routes/index'));


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
