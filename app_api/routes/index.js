const express = require('express');
const router = express.Router();

// This is where we import the controllers we will route
const tripsController = require('../controllers/trips');

// Define route for our trips endpoint
router
    .route('/trips')
    .get(tripsController.tripList)
    .post(tripsController.tripAddTrip)


// GET Method routes tripsFindByCode - requires parameter
// PUT Method routes tripUpdateTrip  - requires parameter
router
    .route('/trips/:tripCode')
    .get(tripsController.tripsFindByCode)
    .put(tripsController.tripUpdateTrip);

module.exports = router;