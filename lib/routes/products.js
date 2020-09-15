'use strict';

// =============================================================================

const express = require('express');
const Products = require('../models/products/products.collection');
const products = new Products();
const router = express.Router();

// =============================================================================
// Products Routes

router.get('/', getProduct);

router.get('/:id', getOneProduct);

router.post('/', createProduct);

router.put('/:id', updateProduct);

router.delete('/:id', deleteProduct);

// =============================================================================
// Products Functions

function getProduct(req, res, next) {
  products.get()
    .then(data => {
      let count = data.length;
      let results = data;
      res.status(200).json({ count, results });
    })
    .catch(next);
}

function getOneProduct(req, res, next) {
  products.get(req.params.id)
    .then(data => {
      let count = data.length;
      let results = data;
      res.status(200).json({ count, results });
    })
    .catch(next);
}

function createProduct(req, res, next) {
  products.create(req.body)
    .then(data => {
      let count = data.length;
      let results = data;
      res.status(200).json({ count, results });
    })
    .catch(next);
}

function updateProduct(req, res, next) {
  products.update(req.params.id, req.body)
    .then(data => {
      let count = data.length;
      let results = data;
      res.status(200).json({ count, results });
    })
    .catch(next);
}

function deleteProduct(req, res, next) {
  products.delete(req.params.id)
    .then(data => {
      let count = data.length;
      let results = data;
      res.status(200).json({ count, results });
    })
    .catch(next);
}


// =============================================================================
// Export
module.exports = router;
