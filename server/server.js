require('./config/config');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');


app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());


app.get('/', (req, res) => {
    res.json({hello: 'Hello World'})
});

app.get('/usuario', (req, res) => {
    res.json({response: 'get usuario'});
});

app.post('/usuario', (req, res) => {
    const body = req.body;

    if (body.nombre === undefined) {
        res.status(400).json({
            ok: false,
            message: 'The name is required',
        })
    } else {
        res.json({
            body
        });
    }
});

app.put('/usuario/:id', (req, res) => {

    let {id} = req.params;

    res.json({
        id,
    });
});

app.delete('/usuario', (req, res) => {
    res.json({response: 'delete usuario'});
});

app.listen(process.env.PORT, () => {
    console.log("Listening port: ", 3000);
});
