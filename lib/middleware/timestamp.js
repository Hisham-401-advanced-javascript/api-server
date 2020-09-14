function addTimestamp(req, res, next) {
  let timestamp = new Date();
  req.timestamp = timestamp;
  next();
}

module.exports = addTimestamp;
