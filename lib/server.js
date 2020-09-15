'use strict';
// =============================================================================
// Libraries
const express = require('express');
require('dotenv').config();
const app = express();

const timestamp = require('./middleware/timestamp.js');
const logger = require('./middleware/logger.js');
const notFound = require('./middleware/404.js');
const serverError = require('./middleware/500.js');

// =============================================================================
// Import Routes

const categoryRoutes = require('./routes/categories.js');
const productRoutes = require('./routes/products.js');

// =============================================================================
// Global Middleware

//express.json steps in front of ALL requests and inspects each for a body, parse it as needed, and include it on the return
app.use(express.json());

app.use(timestamp);

app.use(logger);

// =============================================================================
// Custom Routes

app.use('/api/v1/categories', categoryRoutes);
app.use('/api/v1/products', productRoutes);


// =============================================================================
//JS Error Test Route

app.get('/bad', (req, res) => {
  throw new Error('No bueno');
});

//============================================================================

// Error Routes

// 404 Errors
app.use('*', notFound);

// 500 Errors/Failsafe
app.use(serverError);

// =============================================================================
// Export
module.exports = {
  server: app,
  start: port => {
    const PORT = port || process.env.PORT ||3000;
    app.listen(PORT, ()=> console.log(`listening on ${PORT}`));
  },
};
