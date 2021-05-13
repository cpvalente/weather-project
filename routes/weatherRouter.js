const express = require('express');
const router = express.Router();

// import controller
const weatherController = require('../controllers/weatherController');

// create route between controller and GET '/all' endpoint
router.get('/all', weatherController.getAll);

// create route between controller and GET '/last' endpoint
router.get('/last', weatherController.getLast);

// create route between controller and POST '/create' endpoint
router.post('/create', weatherController.postEntry);

module.exports = router;
