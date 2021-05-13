// import config
const config = require('./config.json');

// import dependencies
const express = require('express');
const http = require('http');
const cors = require('cors');

// import routes
const router = require('./routes/weatherRouter.js');

// create express app
const app = express();

// setup cors for all routes
app.use(cors());

// Implement middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Implement route endpoint
app.use('/', router);

// Serve website
app.use(express.static('website'));

// create HTTP server
const server = http.createServer(app);

// Start server
server.listen(config.port, '0.0.0.0', () =>
  console.log(`HTTP Server is listening on port ${config.port}`)
);
