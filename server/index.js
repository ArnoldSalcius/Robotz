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

//server static files
app.use(express.static(path.resolve(__dirname, '../client/build')));

//********************* ROUTES ************************
app.use('/robots', robotRoutes);
app.use('/users', userRoutes);
app.use('/auth', authRoutes);


//Remaining react stuff
app.get("*", function (request, response) {
    response.sendFile(path.resolve(__dirname, "../client/build", "index.html"));
});


//Catch bad json errors
app.use((err, req, res, next) => {
    if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
        console.error(err);
        return res.status(400).send({ status: 404, message: err.message }); // Bad request
    }
    next();
});

mongoose.connect(DB_URL);

const db = mongoose.connection;

db.on('error', err => {
    console.log(err);
})

db.on('connected', () => {
    console.log('Mongoose is connected');
});



module.exports = app;