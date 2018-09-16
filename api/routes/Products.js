const express = require('express');
const mongoose = require('mongoose');
const Product = require('../models/Products');

const router = express.Router();

router.get('/', (request, response) => {
  Product.find()
    .exec()
    .then((result) => {
      response.status(200).json({ result });
    })
    .catch((error) => {
      response.status(500).json({ error });
    });
});

router.get('/:productId', (request, response) => {
  const id = request.params.productId;
  Product.findById(id)
    .exec()
    .then((result) => {
      response.status(200).json({ result });
    })
    .catch((error) => {
      response.status(500).json({ error });
    });
});

router.post('/', (request, response) => {
  if (request.body.name !== '' && request.body.price !== '') {
    const product = new Product({
      _id: new mongoose.Types.ObjectId(),
      name: request.body.name,
      price: request.body.price,
    });
    product
      .save()
      .then((result) => {
        response.status(200).json({ createdProduct: result });
      })
      .catch((error) => {
        response.status(200).json({ error });
      });
  } else {
    response.status(200).json({ message: 'Cannot create empty item' });
  }
});

router.delete('/:productId', (request, response) => {
  const id = request.params.productId;
  Product.remove({ _id: id })
    .exec()
    .then((result) => {
      response.status(200).json({ result });
    })
    .catch((error) => {
      response.status(500).json({ error });
    });
});

router.patch('/:productId', (request, response) => {
  const id = request.params.productId;
  const updateOps = {};
  for (const ops of request.body) {
    updateOps[ops.propName] = ops.value;
  }
  Product.update({ _id: id }, { $set: updateOps })
    .exec()
    .then((result) => {
      response.status(200).json({ result });
    })
    .catch((error) => {
      response.status(500).json({ error });
    });
});

module.exports = router;
