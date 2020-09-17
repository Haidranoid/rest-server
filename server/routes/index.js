const express = require('express');
const app = express();

app.use(require('./api-login'));
app.use(require('./api-users'));
app.use(require('./api-categories'));
app.use(require('./api-products'));
app.use(require('./api-files'));
app.use(require('./api-uploads'));

module.exports = app;

