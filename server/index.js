const express = require('express');
const mongoose = require('mongoose');
const logger = require('morgan');
require('dotenv').config();

const robotRoutes = require('./routes/robot');
const userRoutes = require('./routes/user');
const authRoutes = require('./routes/auth');


const DB_URL = process.env.DB_URL;


const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//********************* ROUTES ************************
app.use('/robots', robotRoutes);
app.use('/users', userRoutes);
app.use('/auth', authRoutes);

mongoose.connect(DB_URL);

const db = mongoose.connection;

db.on('error', err => {
    console.log(err);
})

db.on('connected', () => {
    console.log('Mongoose is connected');
});



module.exports = app;