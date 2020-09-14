'use strict';

// Libraries
const express = require('express');
require('dotenv').config();
const app = express();
// -----------------------------------------------

// const fruitRouter = require('./routes.js');
const timestamp = require('./middleware/timestamp.js');
const logger = require('./middleware/logger.js');
const notFound = require('./middleware/404.js');
const serverError = require('./middleware/500.js');
// -----------------------------------------------

// Global Middleware
app.use(express.json());
app.use(timestamp);
app.use(logger);
// -----------------------------------------------

// Temporary Databases
let categoryDB = [];
let productDB = [];
// -----------------------------------------------

// Categories Routes

app.post('/categories', (req, res, next) => {
  let { name, display_name, description } = req.body;
  let record = { name, display_name, description };
  record.id = categoryDB.length + 1;
  categoryDB.push(record);
  res.json(record);
});

app.get('/categories', (req, res, next) => {
  // return all categories
  let count = categoryDB.length;
  let results = categoryDB;
  res.json({ count, results });
});

app.get('/categories/:id', (req, res, next) => {
  // return one category by id
  let id = req.params.id;
  let record = categoryDB.filter((record) => record.id === parseInt(id));
  res.json(record[0]);
});

app.put('/categories/:id', (req, res, next) => {
  // replace one category by id
  let idToUpdate = req.params.id;
  let { name, display_name, description } = req.body;
  let updatedCategory = { name, display_name, description, idToUpdate };
  categoryDB = categoryDB.map((record) => (record.id === parseInt(idToUpdate)) ? updatedCategory : record);
  res.json(updatedCategory);
});

app.delete('/categories/:id', (req, res, next) => {
  // deletes one category by id
  let id = req.params.id;
  categoryDB = categoryDB.filter((record) => record.id !== parseInt(id));
  res.json({});
});

// -----------------------------------------------

// Products Routes


app.post('/products', (req, res, next) => {
  // create a new product
  let { category, name, display_name, description } = req.body;
  let record = { category, name, display_name, description };
  record.id = productDB.length + 1;
  productDB.push(record);
  res.json(record);

});

app.get('/products', (req, res, next) => {
  // return all products
  let count = productDB.length;
  let results = productDB;
  res.json({ count, results });

});

app.get('/products/:id', (req, res, next) => {
  // return one products by id
  let id = req.params.id;
  let record = productDB.filter((record) => record.id === parseInt(id));
  res.json(record[0]);

});

app.put('/products/:id', (req, res, next) => {
  // replace one products by id
  let idToUpdate = req.params.id;
  let { category, name, display_name, description } = req.body;
  let updatedProduct = { category, name, display_name, description, idToUpdate };
  productDB = productDB.map((record) => (record.id === parseInt(idToUpdate)) ? updatedProduct : record);
  res.json(updatedProduct);
});

app.delete('/products/:id', (req, res, next) => {
  // deletes one products by id
  let id = req.params.id;
  productDB = productDB.filter((record) => record.id !== parseInt(id));
  res.json({});
});

// -----------------------------------------------

//JS Error Test Route
app.get('/bad', (req, res) => {
  throw new Error('No bueno');
});
// -----------------------------------------------

// Error Routes

// 404 Errors
app.use('*', notFound);

// 500 Errors
app.use(serverError);
// -----------------------------------------------

// Export
module.exports = {
  server: app,
  start: port => {
    const PORT = port || process.env.PORT || 3000;
    app.listen(PORT, () => console.log(`listening on ${PORT}`));
  },
};
