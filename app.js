var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

require('./models/connection');

var bookingRouter = require('./routes/bookings');
var cartRouter = require('./routes/cart');
var homeRouter = require ('./routes/home');


var app = express();
const cors = require('cors');
app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.use('/bookings', bookingRouter);
app.use('/cart', cartRouter);
app.use('/home',homeRouter);

module.exports = app;
