require('./config/config');
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use(require('./routes/users'));

app.get('/', (req, res) => {
    res.json({hello: 'Welcome to Coffee API'})
});

mongoose.connect('mongodb://localhost/coffee', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
},(err) => {
    if (err) throw err;

    app.listen(process.env.PORT, () => {
        console.log("Listening port => ",3000);
    });
});
