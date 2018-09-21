const express = require('express/lib/express');
const logger = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();

// Midldlewares
app.use(logger('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Connect to database
mongoose
  .connect(process.env.MONGO_ATLAS_CONNECTION_STRING, { useNewUrlParser: true })
  .then(() => {
    console.log(`[Mongoose] : Connected as '${process.env.MONGO_ATLAS_DB_USER}'...`);
  })
  .catch((error) => {
    console.log(`[Mongoose] : ${error}`);
  });
const productRoutes = require('./api/routes/Products');
const orderRoutes = require('./api/routes/Orders');

// Provide access to all origins
app.use((request, response, next) => {
  response.header('Access-Control-Allow-Origin', '*');
  response.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  if (request.method === 'OPTIONS') {
    response.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
    response.status(200).json({});
  }
  next();
});

// Handling routes
app.use('/products', productRoutes);
app.use('/orders', orderRoutes);

// Handles error which occur in the entire application
app.use((request, response, next) => {
  const error = new Error('Not Found');
  error.status = 404;
  next(error);
});

app.use((error, request, response) => {
  response.status(error.status || 500).json({
    error: {
      message: error.message,
    },
  });
});

module.exports = app;
