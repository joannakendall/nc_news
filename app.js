const express = require('express');
const app = express();
const apiRouter = require('./routes/apiRouter')
const {handle500s, handleInvalidPaths} = require('./errors')

app.use(express.json());

app.use('/api', apiRouter);

app.all('/*', handleInvalidPaths)

app.use(handle500s);

module.exports = app;
