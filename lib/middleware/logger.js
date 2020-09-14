'use strict';

function logger(req, res, next) {
  console.log('__REQUEST__', req.method, req.path, req.timestamp);
  next();
}

module.exports = logger;
