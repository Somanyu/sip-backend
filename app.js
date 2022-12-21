var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config({ path: './.env' });

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());

// MongoDB connection setup
mongoose.set('strictQuery', false);
mongoose.connect(process.env.MONGODB_CONNECT,
    { useNewUrlParser: true }, (err) => {
      if (!err) {
        console.log('Connected to MongoDB Atlas.');
      } else {
        console.log('Error in connecting to MongoDB Atlas: ' + err);
      }
    }
  )

app.use('/', indexRouter);
app.use('/users', usersRouter);

module.exports = app;
