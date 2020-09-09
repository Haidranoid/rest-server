const express = require('express');
const _ = require('lodash');
const {authenticateToken} = require('./../middlewares/authentication');
const Product = require('../models/Product');
const app = express();

app.get('/products');
app.get('/products/:id');
app.post('/products');
app.put('/products/:id');
app.delete('/products/:id');


module.exports = app;