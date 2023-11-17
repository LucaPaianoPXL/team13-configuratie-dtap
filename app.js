const express = require('express');
const routes = require('./routes');
const path = require('path')

const dotenv = require('dotenv').config({path: path.join(__dirname, '.env')});

const app = express();

app.use(express.static(path.join(__dirname, 'public')))
app.use('/calc', routes);

module.exports = app   
