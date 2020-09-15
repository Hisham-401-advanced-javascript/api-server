'use strict';

function errorHandler(err, req, res, next) {
  res.status(500);
  res.statusMessage = 'Server Error';
  // res.json({ error: err });
  res.send('error')
}

module.exports = errorHandler;
