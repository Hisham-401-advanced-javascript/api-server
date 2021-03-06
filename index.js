'use strict';

require('dotenv').config();
const mongoose = require('mongoose');
const server = require('./lib/server.js');

const mongooseOptions = {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: true,
  useUnifiedTopology: true
};

mongoose.connect(process.env.MONGODB_URL, mongooseOptions);

server.start(process.env.PORT);
