const express = require('express');

const router = express.Router();

router.get('/', (request, response) => {
  response.status(200).json({
    message: 'Handling GET requests to orders',
  });
});

router.post('/', (request, response) => {
  const order = { productId: request.params.productId };
  response.status(200).json({
    message: 'Handling POST request to orders',
    order,
  });
});

module.exports = router;
