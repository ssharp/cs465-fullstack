const mongoose = require('mongoose');
const Trip = require('../models/travlr'); // Register model
const Model = mongoose.model('trips');

// GET: /trips - lists all the trips
const tripList = async (req, res) => {
    const q = await Model
        .find({}) // Retrun single record
        .exec();

        // Uncomment the following line to see the raw data in the console
        // console.log(q);

    if (!q)
    { // Database returned no data
        return res
                .status(404)
                .json(err);
    } else { // Return resulting trip list
        return res
            .status(200)
            .json(q);
    }
};

// GET: /trips/:tripCode - return a single trip by code
// Regardless of outcome, response must include HTML status code and JSON data
const tripsFindByCode = async (req, res) => {
    const q = await Model
        .findOne({'code' : req.params.tripCode}) // Return single record
        .exec();

        // Uncomment the following line to see the raw data in the console
        // console.log(q);

    if (!q)
    { // Database returned no data
        return res
                .status(404)
                .json(err);
    } else { // Return resulting trip list
        return res
            .status(200)
            .json(q);
    }
};

module.exports = {
    tripList,
    tripsFindByCode
};