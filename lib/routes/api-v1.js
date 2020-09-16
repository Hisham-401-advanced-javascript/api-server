'use strict';

// =============================================================================

const express = require('express');
const router = express.Router();

const categories = require('../models/categories/categories.collection');
const products = require('../models/products/products.collection');


// =============================================================================

function getModel(req, res, next){

  let model = req.params.model;

  switch(model) {
  case 'categories':
    req.model = categories;
    next();
    return;
  case 'products':
    req.model = products;
    next();
    return;
  default:
    next('Invalid Model');
    return;
  }
}

router.param('model', getModel);

// =============================================================================
// Model Routes

router.get('/:model', getAll);

router.get('/:model/:id', getOne);

router.post('/:model', createNew);

router.put('/:model/:id', updateOne);

router.delete('/:model/:id', deleteOne);

// Patch Route?  

// =============================================================================
// Model Functions

function getAll(req, res, next){
  req.model.get()
    .then(data => {
      res.status(200).json(data);
    })
    .catch(next);
}

function getOne(req, res, next){
  req.model.get(req.params.id)
    .then(data => {
      res.status(200).json(data);
    })
    .catch(next);
}

function createNew(req, res, next){
  req.model.create(req.body)
    .then(data => {
      res.status(200).json(data);
    })
    .catch(next);
}

function updateOne(req, res, next){
  req.model.update(req.params.id, req.body)
    .then(data => {
      res.status(200).json(data);
    })
    .catch(next);
}

function deleteOne(req, res, next){
  req.model.delete(req.params.id)
    .then(data => {
      res.status(200).json(data);
    })
    .catch(next);
}

// =============================================================================
// Export
module.exports = router; 